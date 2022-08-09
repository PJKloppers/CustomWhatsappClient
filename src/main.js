const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const { Client, Location, List, Buttons, LocalAuth} = require('whatsapp-web.js');

const wclient = new Client(
   { puppeteer: 
    { headless: false ,
        args: ['--disable-background-mode','--no-sandbox','--no-experiments','--app=https://web.whatsapp.com/','--window-size=900,740']
    }
}
);

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


    // Now we can start the client methods
    
    wclient.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED');
      //send qr to frontend via IPC
        mainWindow.webContents.send('qr', qr);
    
    });
    
    wclient.on('ready', () => {
        console.log('Client is ready!');
    });
    
    wclient.on('message', msg => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
    });
    

    wclient.initialize();
});






// IPC HANDELERS
ipcMain.on('data', function(event, data){
    console.log(data);
    mainWindow.webContents.send('respond_data', data);
});