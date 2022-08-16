const {ipcRenderer} = require('electron');

// require jquery
const $ = require('jquery');


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
    FormatAllTables();
    $('table').DataTable();
} );

//function to get all tables on the page
function FormatAllTables(){
    var tables = document.getElementsByTagName('table');
    // format each table in tables
    for(var i = 0; i < tables.length; i++){
        formatTable(tables[i]);
    }
}



// function to add features to table element
function formatTable(table){



    // rows = table.rows;
    // //append cell to first row
    // var cell = rows[0].insertCell(0);
    // //append text to cell
    // cell.innerHTML = "Select";
    // //set cell to first column



    //loop through each row
    // for(var i = 1; i < rows.length; i++){
    //     //append cell to row
    //     var cell = rows[i].insertCell(0);
    //     //append checkbox to cell
    //     var checkbox = document.createElement('input');
    //     checkbox.type = "checkbox";
    //     checkbox.name = "checkbox";
    //     checkbox.value = "Select";
    //     checkbox.id = "checkbox";
    //     checkbox.checked = true;
    //     cell.appendChild(checkbox);
    // }



    // add bootstrap class to table element
    table.className = "table table-striped table-hover table-bordered";

    // change the first row into the the table head
    //get the first row of the table
    var firstRow = table.rows[0];
    // delete the first row from the table
    table.deleteRow(0);

    //create a empty table head 
    var tableHead = document.createElement('thead');
    //add tableHead to the table
    table.appendChild(tableHead);

    //create empty head row 
    var headRow = document.createElement('tr');
    //add headRow to the table head
    tableHead.appendChild(headRow);

    // change firstRow Items int ('th') items
    for(var i = 0; i < firstRow.cells.length; i++){
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(firstRow.cells[i].innerHTML));
        headRow.appendChild(th);
    }

    for(var i = 0; i < table.rows.length; i++){
        table.rows[i].className = "";
    }

}




    
    

    
