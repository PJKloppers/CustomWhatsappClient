
    
    const {ipcRenderer} = require('electron');
    const { stringify } = require('ini');
    const qrcode = require('qrcode');

            

    function sendData(topic, data) {
       
        ipcRenderer.send(topic, data);
       
    }

    ipcRenderer.on('respond_data', (event, data) => {
        alert("Data received " + data);
    } );

    //IPC receive qr data
    ipcRenderer.on('qr', (event, data) => {
        
        qrcode.toDataURL(data, function (err, url) {
            const img = document.createElement('img');
            img.src = url;
            img.className = 'qr';
            img.width=200;
            document.getElementById('qrcode').innerHTML = '';
            document.getElementById('qrcode').appendChild(img);
        } );

    }
    );

    
    
    
