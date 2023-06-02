import translations from "./translations.json";
import {db } from './firebase.js';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';

export async function createDocument(uid){
  // Add a new document in collection "users"
  await setDoc(doc(db, "users", uid), {
  });
} 
export async function handleSubmitRegister(event) {
  event.preventDefault();
  const email = document.getElementById('mailInput').value;
  const password = document.getElementById('passwordInput').value;
  const profilePic = document.getElementById('profilePicInput').files[0];
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // Update user profile with picture
      const profilePicUrl = await uploadProfilePicture(profilePic, user.uid);
      if (profilePicUrl) {
        await updateProfile(user, { photoURL: profilePicUrl });
      }
      // Create a user Document
      createDocument(user.uid);
      // Closes the Popup
      document.getElementById("closePopUpBtn").click();
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode + "Error code");
    });
}
export async function handleSubmitLogin(event) {
  event.preventDefault();
  const email = document.getElementById('mailInputLogin').value;
  const password = document.getElementById('passwordInputLogin').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      //Closes the Popup
      document.getElementById("closePopUpBtn").click();
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
}

export function setLanguageAccount() {
    var languageCode = localStorage.getItem('Language');
    //Head Text
    const element1 = document.getElementById("headText");
    //E-Mail Label
    const element2 = document.getElementById("mailLabel");
    //Password Label
    const element3 = document.getElementById("passwordLabel"); 
    //Advertise Text
    const element4 = document.getElementById("advertiseText"); 
    //Submit Btn
    const element5 = document.getElementById("submitBtnRegister"); 
    //Submit Btn
    const element6 = document.getElementById("submitBtnLogin"); 

    element1.innerHTML = translations[languageCode].accountHeader;
    element2.innerHTML = translations[languageCode].emailLabel;
    element3.innerHTML = translations[languageCode].passwordLabel;
    element4.innerHTML = translations[languageCode].advertiseText;
    element5.value = translations[languageCode].submitBtnRegister;
    element6.value = translations[languageCode].submitBtnLogin;
}
async function uploadProfilePicture(profilePic, userid) {
  // Create a reference to the storage bucket where you want to upload the picture
  var downloadURLFinal = "";
  const storage = getStorage();
  var imageSource = "profilePictures/"+profilePic.name;
  const storageRef = ref(storage, imageSource);
  // Upload the picture file to the storage bucket
  //const snapshot = uploadBytes(storageRef, profilePic);

  await uploadBytes(storageRef, profilePic)
    .then(snapshot => {
      return getDownloadURL(snapshot.ref)
    })
    .then(downloadURL => {
      downloadURLFinal = downloadURL;
    })
  // Return the download URL
  return downloadURLFinal;
}