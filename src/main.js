const {app, BrowserWindow, Menu, ipcMain,dialog} = require('electron');
const path = require('path');
const url = require('url');
const fs = require("fs");

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
    wclient.initialize();
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
            
        event.sender.send('open-dialog', response.filePaths[0]);
        
          console.log(response.filePaths[0]);
        } else {
          console.log("no file selected");
        }
    });
});





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