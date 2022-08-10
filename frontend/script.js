const {ipcRenderer} = require('electron');

// get element "XLSX"
const xlsxdiv = document.getElementById('xlsx');


function opendialog(){
    sendData('open-dialog', 'open');
}
    


function sendData(topic, data) {
    ipcRenderer.send(topic, data);
}

ipcRenderer.on('respond_data', (event, data) => {
    alert("Data received " + data);
} );

// ipcrenderer on open-dialog responce
ipcRenderer.on('open-dialog', (event, JSONDATA) => {
    //convert JSONDATA to string
    var datastring = JSON.stringify(JSONDATA);
  
    //displaysheet(JSONDATA)


} );

// Create Ipc event for "filedata"
ipcRenderer.on('filedata', (event, data) => {
    xlsxdiv.innerHTML = data;
} );



function displaysheet(jsobj){
    

var filename = jsobj.filename;
var sheets = jsobj.sheets;
console.log(JSON.stringify(jsobj))
    
var worksheet  = XLSX.utils.aoa_to_sheet(sheets[0]);
xlsxdiv.innerHTML = XLSX.XLSX.utils.sheet_to_html(worksheet);
    
}



    
    
    

    
