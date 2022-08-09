
    const list = document.getElementById('itemslist');
    Element = document.getElementById('input');
    const {ipcRenderer} = require('electron');

    //when enter is pressed send data
    Element.onkeydown = function(e){
    if(e.keyCode == 13){
        sendData();
    }
    }
            

    function sendData(){
       
        var data = Element.value;
        // if data is empty dont send it
        if(data == ''){
            //alert user
            alert('Please Enter Data');
            return;
        }
        ipcRenderer.send('data', data);
        Element.value = '';
        //alert data sent
        alert('Data sent');
    }
    ipcRenderer.on('respond_data', (event, data) => {
        alert("Data received " + data);
        
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const itemText = document.createTextNode(data);
        li.appendChild(itemText);
        list.appendChild(li);

    } );