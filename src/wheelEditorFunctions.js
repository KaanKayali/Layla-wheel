export function newInputBox(){
    const form = document.getElementById("entrylistForm");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "newInput";
    form.appendChild(newInput);
  }

export function delInputBox(){
    const form = document.getElementById('entrylistForm');
    const inputs = form.querySelectorAll('input');
    const lastInput = inputs[inputs.length - 1];
    if (inputs.length > 1){
      form.removeChild(lastInput);
    }
}
export function getFormattedDate(stringDate){
    const currentDate = new Date(stringDate)
    const hour = currentDate.getHours();
    const min = currentDate.getMinutes();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min} | ${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    
    return formattedDate;
}
export function changeWheelDesign(var1, var2){

  const entry = { colour1: var1, colour2: var2 };
  localStorage.setItem('ColorDesign', JSON.stringify(entry));

  //Removes all markings
  const allLanguages = document.getElementsByClassName("designSelect");
  for (let i = 0; i < allLanguages.length; i++) {
    const element = allLanguages[i];
    element.style.border = 'none';
  }

  //Marks the Selected Design
  const selectedDesign = document.getElementById(var1 +"/"+ var2);
  selectedDesign.style.border = '2px solid orange';
}
export function getColorCode(){
  // Retrieve the stored data from localStorage
  var storedColor = localStorage.getItem('ColorDesign');
  var colorObj = JSON.parse(storedColor);
  var colorCode1 = colorObj.colour1;
  var colorCode2 = colorObj.colour2;

  //Marks the Selected Design
  var colorCode = colorObj.colour1 + "/" + colorObj.colour2;
  const selectedDesign = document.getElementById(colorCode);
  selectedDesign.style.border = '2px solid orange';

  return { colour1: colorCode1, colour2: colorCode2 };
}
