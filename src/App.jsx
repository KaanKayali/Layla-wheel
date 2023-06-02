import "./styles.css";
import React, { useState } from 'react';
import WheelComponent from "react-wheel-of-prizes";
import ShowWinner from "./winner.jsx";
import { getAuth, signOut } from "firebase/auth";
import Account from "./LoginRegister.jsx";

import {loadOldWins,showProfile,fireBaseLogOut,getUserStatus,setLanguage,addEntryForLocalSave,changeWheelDesign,getColorCode,sliderchanged,processInput,setSlider,loadoldsegments} from "./wheelEditorFunctions.js";

const segments = [];
const segColors = ["saddlebrown", "darkred"];
export default function App() {
  const [showWinner, setShowWinner] = useState(false);
  const [Accounts, setAccounts] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const [refreshWheel, setRefreshWheel] = useState(false);

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
    //Load old Segments or load examples
    var newsegments = loadoldsegments();
    segments.push(...newsegments);
    loadOldWins();
    //Put the right color in the array
    segColors.length = 0;
    var { colour1, colour2 } = getColorCode();
    for (let i = 0; i < segments.length/2; i++) {
      segColors.push(colour1, colour2)
    }
    setSlider();
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
    setRefreshWheel(!refreshWheel);
  }

  function removeEntryFromArray(){
    const form = document.getElementById("delinput");
    const segmentName = form.value;
    
    // Find the index of the segment to delete
    const indexToDelete = segments.findIndex(segment => segment === segmentName);
    if (segments.length > 1){
      // Delete the segment at the found index
      if (indexToDelete !== -1) {
        segments.splice(indexToDelete, 1);
      }
    }
    else{
      setLanguage();
    }
    localStorage.setItem('Segments', JSON.stringify(segments));
    document.getElementById("delinput").value = "";
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
          <div>
            {/*Wheel*/}
            <WheelComponent
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Layla"
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
              <tbody>
              </tbody>
            </table>
          </div>
          
            {/* Input Field in Array*/}
            <form id="entrylistForm">
              <input type="text" id="entryInput" placeholder="1,2,3,4..."/>
            </form>
            <button className="btn" onClick={addEntries} id="addAll">Add all Entries</button>
            <p id="segmentsCounter"></p><br/>

            {/* Delete Segments */}
            <input type="text" id="delinput" className="entryInput"></input> <br />
            <button className="btn" onClick={removeEntryFromArray} id="deleteInput">Remove Entry</button><br/><br/>

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


