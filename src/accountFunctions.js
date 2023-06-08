import translations from "./translations.json";
import {db } from './firebase.js';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';

export async function createDocument(uid){
  //Add a new document in collection "users"
  await setDoc(doc(db, "users", uid), {
  });
} 
export async function changePFP(){
  //Updates the user profile with the new Picture
  const auth = getAuth();
  const user = auth.currentUser;
  const profilePic = document.getElementById('profilePicInput').files[0];
  const profilePicUrl = await uploadProfilePicture(profilePic);
  if (profilePicUrl) {
    await updateProfile(user, { photoURL: profilePicUrl });
    location.reload();
  }
}
export async function handleSubmitRegister(event) {
  event.preventDefault();
  const email = document.getElementById('mailInput').value;
  const password = document.getElementById('passwordInput').value;
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      //Signed in
      const user = userCredential.user;
      createDocument(user.uid);
      document.getElementById("closePopUpBtn").click();
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
}
export async function handleSubmitLogin(event) {
  event.preventDefault();
  const email = document.getElementById('mailInputLogin').value;
  const password = document.getElementById('passwordInputLogin').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //Signed in 
      const user = userCredential.user;
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
async function uploadProfilePicture(profilePic) {
  //Upload the picture file to the storage bucket
  var downloadURLFinal = "";
  const storage = getStorage();
  var imageSource = "profilePictures/"+profilePic.name;
  const storageRef = ref(storage, imageSource);

  await uploadBytes(storageRef, profilePic)
    .then(snapshot => {
      return getDownloadURL(snapshot.ref)
    })
    .then(downloadURL => {
      downloadURLFinal = downloadURL;
    })

  return downloadURLFinal;
}