const {app, BrowserWindow, Menu, ipcMain,dialog} = require('electron');
const path = require('path');
const url = require('url');
const fs = require("fs");

// xlsx to json module
var XLSX = require("xlsx");



let mainWindow;


const { Client, Location, List, Buttons, LocalAuth} = require('whatsapp-web.js');

const wclient = new Client(
   { puppeteer: 
    { 
        headless: false,
        args: ['--disable-background-mode','--no-sandbox','--no-experiments','--app=https://web.whatsapp.com/','--window-size=900,740']
    },
   // authStrategy: new LocalAuth(),
});



//Main Entry Point

app.on('ready', function(){
    //set ICON
    app.dock.setIcon(path.join(__dirname, 'icon.png'));
    
    //start gui
    startGui();
    //initialize client
    //wclient.initialize();
});

// wclient functions
wclient.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED');
  

});

wclient.on('ready', () => {
    console.log('Client is ready!');
    startGui();

    
});

wclient.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});
wclient.on('disconnected', (reason) => {
    app.quit()
});




// IPC HANDELERS
ipcMain.on('data', function(event, data){
    console.log(data);
    mainWindow.webContents.send('respond_data', data);
});

//on opend-dialog Ipc event
ipcMain.on('open-dialog', function(event,data){
    dialog.showOpenDialog({properties: ['openFile'] }).then(function (response) {
        if (!response.canceled) {
            
        //log file path to console 
        console.log("\n Opening File : "+response.filePaths[0] +"\n\n");

        //open excel filefunction called 
        openExcel(response.filePaths[0]);
        //send json object to mainWindow          
        } else {
          console.log("no file selected");
        }
    });
});

//function to open exel file and convert to json
function openExcel(filePath){

    var workbook = XLSX.readFile(filePath);

    var HTML =""

    var sheet_name_list = workbook.SheetNames;
    // for the length of the sheet_name_list
    for(var i = 0; i < sheet_name_list.length; i++){
        HTML += XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[i]]);
    }
    
    mainWindow.webContents.send('filedata', HTML);
}

// Create iPc socket for "sheet" event
ipcMain.on('sheet', function(event, data){
    //generate html from sheet using xlsx-to-html module
    var HTML = XLSX.utils.sheet_to_html(data);
    //send html to mainWindow
    mainWindow.webContents.send('sheet', HTML);

} );



// FUNCTIONS to START GUI
function startGui(){
    
    mainWindow = new BrowserWindow({
        width: 700,
        height: 550,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          }
         
       
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../frontend/main.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    } );
}



