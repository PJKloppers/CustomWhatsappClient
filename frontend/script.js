const {ipcRenderer} = require('electron');



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
    var data = JSON.stringify(JSONDATA);
    //alert(data);

    alert("JSONDATA : " + toString(data));
} );


    
    
    

    
