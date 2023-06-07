import "./styles.css";
import React, { useEffect,useState } from 'react';
import WheelComponent from "react-wheel-of-prizes";
import ShowWinner from "./winner.jsx";
import Account from "./LoginRegister.jsx";
import {db,auth } from './firebase.js';

import {loadOldWins,checkForEmptyLocalStorage,showProfile,getUserStatus,setLanguage,addEntryForLocalSave,changeWheelDesign,getColorCode,sliderchanged,processInput,setSlider,loadoldsegments} from "./wheelEditorFunctions.js";

const segments = [];
const segColors = ["saddlebrown", "darkred"];
export default function App() {
  const [showWinner, setShowWinner] = useState(false);
  const [Accounts, setAccounts] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const [refreshWheel, setRefreshWheel] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      switchIcons();
    });
    return () => {
      unsubscribe(); // Unsubscribe the listener when the component unmounts
    };
  }, []);

  const onFinished = (winner) => {
    addEntryForLocalSave(winner)
    setWinnerName(winner);
    setShowWinner(true);
  };
  const closeWinnerPopup = () => {
    setShowWinner(false);
  };
  const closeAccountsPopup  = () => {
    setAccounts(false);
    switchIcons();
    loadOldWins();
  };

  window.onload = function() { 
    checkForEmptyLocalStorage();
    //Load old Segments or load examples
    var newsegments = loadoldsegments();
    segments.push(...newsegments);
    //Put the right color in the array
    segColors.length = 0;
    var { colour1, colour2 } = getColorCode();
    for (let i = 0; i < segments.length/2; i++) {
      segColors.push(colour1, colour2)
    }
    //Set the Slider to the correct Value
    setSlider();
    renderTable();
    loadOldWins();
    switchIcons();   
    setRefreshWheel(!refreshWheel); 
  };
  function allowLogin(){
    setAccounts(true);
  }
  function addEntries(){
    //Get Input and clear
    var input = document.getElementById("entryInput").value;
    const entries = processInput(input);
    document.getElementById("entryInput").value = "";

    //Make sure Example 1/2 are not inside the Segments
    const segmentsNew = segments.filter(segment => segment !== "Example 1" && segment !== "Example 2");
    segmentsNew.push(...entries);
    segments.length = 0;
    segments.push(...segmentsNew);

    // Get Array lenght
    var arraycount = segments.length;
    arraycount = arraycount/2;
    var i = 1;

    while (i < arraycount) 
    {
      i++
      var { colour1, colour2 } = getColorCode();
      segColors.push(colour1, colour2);
    }
    localStorage.setItem('Segments', JSON.stringify(segments));
    setLanguage();
    renderTable();
    setRefreshWheel(!refreshWheel);
  }
  function languageChange(languageCode){
    localStorage.setItem('Language', languageCode);
    setLanguage();
  }
  function switchIcons(){
    const userState = getUserStatus();
    if (userState) {
      showProfile();
      loadOldWins();
    }else{
      //Delete the AccountIcon if it exists
      var element = document.getElementById("AccountIcon");
      if (element) {
        element.parentNode.removeChild(element);
      }
      // JavaScript code to set the img element in the accountDiv
      const accountDiv = document.getElementById('accountDiv');
      const imgElement = document.createElement('img');
      imgElement.alt = 'Login/Register Button';
      imgElement.src = "src/Images/Account/accountUser.png"
      imgElement.id = 'AccountIcon';
      imgElement.className = 'accounticons';
      imgElement.addEventListener('click', allowLogin);
      accountDiv.appendChild(imgElement);
    }
  }
  function deleteSegment(index) {
      segments.splice(index, 1); // Remove the segment at the specified index
      localStorage.setItem('Segments', JSON.stringify(segments));
      location.reload();
  }
  function renderTable() {
    var tableBody = document.getElementById("segmentsTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear the existing table body
    // Loop through the segments array and create rows for each segment
    for (var i = 0; i < segments.length; i++) {
      var row = document.createElement("tr");
      
      // Create a cell for the segment
      var segmentCell = document.createElement("td");
      segmentCell.id = "entryCell"
      segmentCell.innerText = segments[i];
      row.appendChild(segmentCell);
      
      // Create a cell for the delete button
      var buttonCell = document.createElement("td");
      
      // Create the delete button
      var deleteButton = document.createElement("button");
      var deleteImage = document.createElement("img");
      deleteImage.src = "src/Images/trash-icon.png";
      deleteImage.alt = "Delete";
      deleteImage.id = "trashcan"
      deleteButton.id = "imageholder";
      deleteButton.appendChild(deleteImage);
      
      // Attach onclick event
      deleteImage.onclick = (function(index) {
        return function() {
          deleteSegment(index);
        };
      })(i); // Using a closure to capture the current index value
      
      buttonCell.appendChild(deleteImage);
      row.appendChild(buttonCell);
      tableBody.appendChild(row);
    }
  }
  

  return (
    <>
      <div id="nav">
      <header>
        <div id="accountDiv"></div>
      </header> 
      <div id="languageDiv">
          {/*Language Change*/}
          <div class="column">
            <img src="src/Images/Flags/UK-Flag.png" alt="Image of the UK Flag" onClick={() => languageChange('english')} className="langSelect" id="english"/>
          </div>
          <div class="column">
            <img src="src/Images/Flags/German-Flag.png" alt="Image of the German Flag" onClick={() => languageChange('german')} className="langSelect" id="german"/>
          </div>
          <div class="column">
            <img src="src/Images/Flags/Albania-Flag.jpg" alt="Image of the Albanian Flag" onClick={() => languageChange('albania')} className="langSelect" id="albania"/>
          </div>
          <div class="column">
            <img src="src/Images/Flags/Bosnia-Flag.png" alt="Image of the Bosnian Flag" onClick={() => languageChange('bosnian')} className="langSelect" id="bosnian"/>
          </div>
          <div class="column">
            <img src="src/Images/Flags/Croatia-Flag.png" alt="Image of the Croation Flag" onClick={() => languageChange('croatian')} className="langSelect" id="croatian"/>
          </div>
          <div class="column">
            <img src="src/Images/Flags/Serbia-Flag.png" alt="Image of the Serbian Flag" onClick={() => languageChange('serbian')} className="langSelect" id="serbian"/>
          </div>
      </div>
    </div>
      
    <div class="float-child">
        <div className="App">
          <div id="wheeldiv">
            {/*Wheel*/}
            <WheelComponent
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="SpinMania"
              isOnlyOnce={false}
              size={190}
              upDuration={localStorage.getItem('UpDuration') / segments.length}
              downDuration={localStorage.getItem('UpDuration') / segments.length}
              fontFamily="Times New Roman"
              key={refreshWheel ? 'refresh' : 'no-refresh'}
              />
          </div>
        </div>
    </div>
      <div class="float-container">
      <div class="float-child">
        <div className="InputDiv">
          <div id="pastResultsDiv">
            {/* Show last Results */}
            <table id="pastResults">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Entry</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          
            {/* Input Field in Array*/}
            <form id="entrylistForm">
              <input type="text" id="entryInput" placeholder="1,2,3,4..."/>
            </form>
            <button className="btn" onClick={addEntries} id="addAll">Add all Entries</button>
            <p id="segmentsCounter"></p><br/>

            {/* Delete Segments */}
            <div id="segmentsDeleteDiv">
              <table id="segmentsTable">
                <thead>
                  <tr>
                    <th id="deleteInput">Segment</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

            {/* Range */}
            <p id="UptimeID"></p>
            <input type="range" min="100" max="60000" class="slider" id="uptimeSlider" defaultValue={200} onChange={sliderchanged}/>
            <p className="time">1s</p><p className="time" id="min">1min</p>
            <br /><br />

            {/* Wheel Designs */}
            <p id="DesignText">Wheel Designs</p>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/darkred_saddlebrown.png" alt="Design 1" onClick={() => changeWheelDesign("darkred","saddlebrown")} className="designSelect" id="darkred/saddlebrown"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/black_saddlebrown.png" alt="Design 2" onClick={() => changeWheelDesign("black","saddlebrown")} className="designSelect" id="black/saddlebrown"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/darkred_black.png" alt="Design 3" onClick={() => changeWheelDesign("darkred","black")} className="designSelect" id="darkred/black"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/darkred_gray.png" alt="Design 4" onClick={() => changeWheelDesign("darkred","gray")} className="designSelect" id="darkred/gray"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/brown_black.png" alt="Design 5" onClick={() => changeWheelDesign("brown","black")} className="designSelect" id="brown/black"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/orange_black.png" alt="Design 6" onClick={() => changeWheelDesign("orange","black")} className="designSelect" id="orange/black"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/yellow_black.png" alt="Design 7" onClick={() => changeWheelDesign("yellow","black")} className="designSelect" id="yellow/black"/>
            </div>
            <div class="designcolumn">
              <img src="src/Images/WheelDesigns/magenta_black.png" alt="Design 8" onClick={() => changeWheelDesign("magenta","black")} className="designSelect" id="magenta/black"/>
            </div>
        </div>
        {showWinner && (<ShowWinner winner={winnerName} onClose={closeWinnerPopup}/>)}
        {Accounts && (<Account onClose={closeAccountsPopup}/>)}
      </div>
      
    </div>  
    </>
  ); 
}


