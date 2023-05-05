import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";

export default function App() {

  /*Wheel*/
  const segments = [
    "casper",
    "kaan",
    ""
  ];

  const segColors = ["saddlebrown", "darkred", "grey"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  
  const entries = [];

  window.onload = function() {
    loadOldWins();
  };
  
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
    const spinnerValues = [];

    inputs.forEach(input => {
      spinnerValues.push(input.value);
      console.log(spinnerValues);
    });
  }

  function loadOldWins(){
    const storedEntries = JSON.parse(localStorage.getItem('Items'));
    const table = document.getElementById('pastResults');

    table.innerHTML = "";


    console.log(storedEntries);

    //Fill Table
    storedEntries.forEach((entry, index) => {
      const row = table.insertRow();
      const indexCell = row.insertCell();
      indexCell.innerHTML = index + 1;
    
      const entryCell = row.insertCell();
      entryCell.innerHTML = entry.content;
    
      const dateCell = row.insertCell();
      dateCell.innerHTML = entry.date;

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


  return (
    <>
      <h1>Layla - Spinwheel</h1>  

      {/* Input Field in Array*/}
      <div>
          <form id="entrylistForm">
            <input type="text" id="trigger"className="entryInput"/>
          </form>
          <button className="btn" onClick={newInputBox}>+</button>
          <button className="btn" onClick={delInputBox}>-</button>
          <button className="btn" onClick={addEntries}>Add all Entries</button>
      </div>

      {/* Show last Results */}
      <div className="pastResultsDiv">
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

      <div className="App">
        <div>
          {/*Wheel*/}
          <WheelComponent>
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
            fontFamily="Times New Roman"
          </WheelComponent>
        </div>
      </div> 
    </> 
  );
}
