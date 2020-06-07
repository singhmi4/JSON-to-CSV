//  User can paste JSON syntax into a text box
const JSONTextAreaBox = document.querySelector('#JSON-input');
const JSONtoCSVBtn = document.querySelector('#submit-JSON');

const CSVOutput = document.querySelector('#CSV-output');

JSONtoCSVBtn.addEventListener('click', function(){
  
//   Generate JSON from string input
  let JSONString = JSONTextAreaBox.value;
  // console.log(JSONString);
  let JSONObject = JSON.parse(JSONString);
  // console.log(JSONObject);
  let JSONKeys = Object.keys(JSONObject[0]);
  // console.log(JSONKeys);
  
  let JSONValues = [];
  
  for (let i=0; i < JSONObject.length; i++) {
  JSONValues.push(Object.values(JSONObject[i]));
  }

  // console.log(JSONValues);
  
//   Generate CSV
  let csvString = "";
  
//   Assign JSON Keys to first row of CSV string
  for (let i=0; i < JSONKeys.length; i++){
    // console.log(JSONKeys[i]);
    if (i != (JSONKeys.length - 1)){
      csvString += `"${JSONKeys[i]}",`;
    } else {
      csvString += `"${JSONKeys[i]}"\n`;
    }
  }
  
//   Assign JSON values to CSV String
  for (let j=0; j < JSONValues.length; j++){
    // console.log(JSONValues[j]);
    for (let k=0; k < JSONValues[j].length; k++){
      // console.log(JSONValues[j][k])
      if (k != (JSONValues[j].length - 1)){
      csvString += `"${JSONValues[j][k]}",`;
      } else {
        csvString += `"${JSONValues[j][k]}"\n`;
      }   
    }
  }
  
  CSVOutput.value = csvString; 
});

const copyCSV = document.querySelector('#copy-csv');

copyCSV.addEventListener('click', function(event){
  CSVOutput.focus();
  CSVOutput.select();
  let selected = CSVOutput.value;
  if (selected.length > 0){
    let copySuccess = copySelectionText();
    showtooltip(event); 
  }
}, false);

function getSelectionText() {
  let selectedText = "";
  if (window.getSelection()) {
    selectedText = window.getSelection().toString();
  }
  return selectedText;
}

function copySelectionText(){
  let copySuccess;
  try{
    copySuccess = document.execCommand("copy");
  } catch(event) {
    copySuccess = false;
  }
  return copySuccess;
}

var tooltip, // global variables oh my! Refactor when deploying!
	hidetooltiptimer

createtooltip();

function createtooltip(){ // call this function ONCE at the end of page to create tool tip object
	tooltip = document.createElement('div')
	tooltip.style.cssText = 
		'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
		+ 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
		+ 'opacity:0;transition:opacity 0.3s'
	tooltip.innerHTML = 'Copied!'
	document.body.appendChild(tooltip)
}

function showtooltip(e){
	var evt = e || event
	clearTimeout(hidetooltiptimer)
	tooltip.style.left = evt.pageX - 10 + 'px'
	tooltip.style.top = evt.pageY + 15 + 'px'
	tooltip.style.opacity = 1
	hidetooltiptimer = setTimeout(function(){
		tooltip.style.opacity = 0
	}, 500)
}

// User can click a 'Convert' button to validate the JSON text box and convert it to CSV

// User can see the converted CSV in another text box

// User can see an warning message if the JSON text box is empty or if it doesn't contain valid JSON

// User can click a 'Clear' button to clear the contents of both the JSON and CSV text boxes.

// Sample JSON Data
/*
    [{
      "color": "black",
      "category": "hue",
      "type": "primary",
      "code": "#000"
    },
    {
      "color": "white",
      "category": "value",
      "type": "primary",
      "code": "#FFF"
    },
    {
      "color": "red",
      "category": "hue",
      "type": "primary",
      "code": "#FF0"
    },
    {
      "color": "blue",
      "category": "hue",
      "type": "primary",
      "code": "#00F"
    },
    {
      "color": "yellow",
      "category": "hue",
      "type": "primary",
      "code": "#FF0"
    },
    {
      "color": "green",
      "category": "hue",
      "type": "secondary",
      "code": "#0F0"
    }]
*/