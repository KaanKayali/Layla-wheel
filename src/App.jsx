import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";

export default function App() {
  const entries = [];
  const segments = ["casper", "kaan"];
  const segColors = ["saddlebrown", "darkred"];
  const onFinished = (winner) => {
    addEntryForLocalSave(winner)
  };

  window.onload = function() {
    loadOldWins();
  };

  function getFormattedDate(stringDate){
    const currentDate = new Date(stringDate)
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    
    return formattedDate;
    
  }

  function newInputBox(){
    const form = document.getElementById("entrylistForm");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "newInput";
    form.appendChild(newInput);
  }

  function delInputBox(){
    const form = document.getElementById('entrylistForm');
    const inputs = form.querySelectorAll('input');
    const lastInput = inputs[inputs.length - 1];
    if (inputs.length > 1){
      form.removeChild(lastInput);
    }
  }

  function addEntries(){
    const form = document.getElementById("entrylistForm");
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
      segments.push(input.value);
      console.log(segments);
    });

    // Get Array lenght
    var arraycount = segments.length;
    arraycount = arraycount/2;
    var i = 1;

    while (i < arraycount) 
    {
      i++
      segColors.push("saddlebrown", "darkred")
    }
  }

  function loadOldWins(){
    const storedEntries = JSON.parse(localStorage.getItem('Items'));
    const table = document.getElementById('pastResults');
    table.innerHTML = "";

    //Insert Header
    const row = table.insertRow();
    const InfoCell = row.insertCell();
    InfoCell.innerHTML = "-";
    const HeadCell = row.insertCell();
    HeadCell.innerHTML = "Last Picks";

    //Fill Table
    storedEntries.forEach((entry, index) => {
      const row = table.insertRow();
      const indexCell = row.insertCell();
      indexCell.innerHTML = index + 1;
    
      const entryCell = row.insertCell();
      entryCell.innerHTML = entry.content;
    
      const dateCell = row.insertCell();
      dateCell.innerHTML = getFormattedDate(entry.date);
    });
  }

  function addEntryForLocalSave(content) {
    //Adds the Entry to the Array
    const currentDate = new Date();
    const entry = { content: content, date: currentDate };

    // If the array has more than 5 entries, remove the oldest one
    if (entries.length >= 5) {
      entries.shift();
    }
    entries.push(entry);
    console.log(entries);

    //Push the Entries Array into local Storage
    localStorage.setItem('Items', JSON.stringify(entries));
  
    //Refreshes the Table
    loadOldWins();
  } 
  function removeEntryFromArray(){
    const form = document.getElementById("delinput");
    const segmentName = form.value;
    
    // Find the index of the segment to delete
    const indexToDelete = segments.findIndex(segment => segment === segmentName);
    
    // Delete the segment at the found index
    if (indexToDelete !== -1) {
      segments.splice(indexToDelete, 1);
    }
    console.log(segments);
    
  }

  return (
    <>
      <header>
            <img src="https://cdn.discordapp.com/attachments/985795697783762965/985879958729662494/Unbenannt.png"/>
      </header> 
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
              contrastColor="lightgrey"
              buttonText="Layla"
              isOnlyOnce={false}
              size={190}
              upDuration={500}
              downDuration={600}
              fontFamily="Times New Roman"/>
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
              <input type="text" className="entryInput"/>
              <input type="text" className="entryInput"/>
            </form>
            <button className="btn" onClick={newInputBox}>+</button>
            <button className="btn" onClick={delInputBox}>-</button>
            <button className="btn" onClick={addEntries}>Add all Entries</button> <br />
                  
            {/* Show last Results */}
            <input type="text" id="delinput" className="entryInput" placeholder="Entry that you want to delete"></input> <br />
            <button className="btn" onClick={removeEntryFromArray}>Remove Entry</button>
        </div>
      </div>
    </div>  
    </>
  );
}

