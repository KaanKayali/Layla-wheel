import { func } from "prop-types";
import "./styles.css";
import React, { useState } from 'react';
import WheelComponent from "react-wheel-of-prizes";
import translations from "./translations.json";
import ShowWinner from "./winner.jsx";
import {getFormattedDate,changeWheelDesign,getColorCode,sliderchanged,processInput,setSlider,loadoldsegments} from "./wheelEditorFunctions.js";

const segments = [];
const segColors = ["saddlebrown", "darkred"];
export default function App() {
  const [showWinner, setShowWinner] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const [refreshWheel, setRefreshWheel] = useState(false);
  var alertNotEnoughSegments = "";

  const onFinished = (winner) => {
    addEntryForLocalSave(winner)
    setWinnerName(winner);
    setShowWinner(true);
    console.log(segments);
  };

  const closeWinnerPopup = () => { setShowWinner(false); };
  window.onload = function() { loadOldWins();
    //Load old Segments or load examples
    var newsegments = loadoldsegments();
    segments.push(...newsegments);
    //Put the right color in the array
    segColors.length = 0;
    var { colour1, colour2 } = getColorCode();
    for (let i = 0; i < segments.length/2; i++) {
      segColors.push(colour1, colour2)
    }
    setRefreshWheel(!refreshWheel);
    setSlider();


    
  };

  function addEntries(){
    var input = document.getElementById("entryInput").value;
    const entries = processInput(input);
    segments.push(...entries);
    document.getElementById("entryInput").value = "";

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
  function loadOldWins(){
    const storedEntries = JSON.parse(localStorage.getItem('PastEntries'));
    const table = document.getElementById('pastResults');
    table.innerHTML = "";

    
    //Insert Header
    const row = table.insertRow();
    const HeadCell = row.insertCell();
    HeadCell.id = "headCell";
    HeadCell.innerHTML = "Last Picks";

    if(storedEntries){
      //Fill Table
      storedEntries.forEach((entry, index) => {
        const row = table.insertRow();

        const entryCell = row.insertCell();
        entryCell.id = "entryCell";
        entryCell.innerHTML = entry.content;
      
        const dateCell = row.insertCell();
        dateCell.id = "dateCell";
        dateCell.innerHTML = getFormattedDate(entry.date);
      });
    }else{
    }
    setLanguage();
  }
  function addEntryForLocalSave(content) {
    //Adds the Entry to the Array
    const currentDate = new Date();
    var storedEntries = JSON.parse(localStorage.getItem('PastEntries'));
    const entry = { content: content, date: currentDate };

    
    if(storedEntries){
      // If the array has more than 5 entries, remove the oldest one
      if (storedEntries.length >= 5) {
        storedEntries.shift();
      }
    }
    else{
      storedEntries = [];
    }
    
    storedEntries.push(entry);
    console.log(storedEntries);

    //Push the Entries Array into local Storage
    localStorage.setItem('PastEntries', JSON.stringify(storedEntries));
  
    //Refreshes the Table
    loadOldWins();
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
      alert(alertNotEnoughSegments);
    }
    localStorage.setItem('Segments', JSON.stringify(segments));
    document.getElementById("delinput").value = "";
    setRefreshWheel(!refreshWheel);
  }
  function languageChange(languageCode){
    localStorage.setItem('Language', languageCode);
    setLanguage();
  }
  function setLanguage(){
    var languageCode = localStorage.getItem('Language');

    //Head Cell of Table
    const element1 = document.getElementById("headCell");
    //Add all Entries Button
    const element2 = document.getElementById("addAll");
    //Remove Entry Button
    const element3 = document.getElementById("deleteInput"); 
    //Segments Counter
    const element4 = document.getElementById("segmentsCounter");
    //Uptime Text
    const element5 = document.getElementById("UptimeID");
    //Uptime Text
    const element6 = document.getElementById("DesignText");
    
    element1.innerHTML = translations[languageCode].lastPicks;
    element2.innerHTML = translations[languageCode].addAllEntries;
    element3.innerHTML = translations[languageCode].removeEntry;
    element4.innerHTML = translations[languageCode].segmentCounter + ": " + segments.length;
    element5.innerHTML = translations[languageCode].Uptime;
    element6.innerHTML = translations[languageCode].design;

    //Content of all possible alerts
    alertNotEnoughSegments = translations[languageCode].alertNotEnoughSegments;
    
    //Removes all markings
    const allLanguages = document.getElementsByClassName("langSelect");
    for (let i = 0; i < allLanguages.length; i++) {
      const element = allLanguages[i];
      element.style.border = 'none';
    }

    //Marks the Selected Language
    const selectedLanguage = document.getElementById(languageCode);

    //"eatLanguage" is a hidden Joke!
    if (languageCode != "eatLanguage"){
      selectedLanguage.style.border = '2px solid orange';
    }
  }

  return (
    <>
      <header>
            <img src="src/Images/laylalogo.png" onClick={() => languageChange('eatLanguage')} id="eatLanguage"/>
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

      <div class="float-container">
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
      <div class="float-child">
        <div className="InputDiv">
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
      </div>
    </div>  
    </>
  ); 
}


