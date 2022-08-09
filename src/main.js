const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const url = require('url');



let mainWindow;
app.on('ready', function(){
    app.dock.setIcon(path.join(__dirname, 'icon.png'));
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
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


});

ipcMain.on('data', function(event, data){
    console.log(data);
    mainWindow.webContents.send('respond_data', data);
});