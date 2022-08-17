const {ipcRenderer} = require('electron');

const  {DataTable} = require( "simple-datatables-classic" )

const $ = require('jquery');
//require('vanilla-js-datatables');
//import {DataTable} from "simple-datatables"// get element "XLSX"
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
   // $('table').DataTable();
} );

//function to get all tables on the page
function FormatAllTables(){
   tables = document.getElementsByTagName('table');
    // format each table in tables
    for(var i = 0; i < tables.length; i++){
        T = tables[i];
        formatTable(T);
        var DataT = new DataTable(T,{
            searchable: true,
            editable: true,
            sortable: true,
            filterable: true,
            pagination: true,
            

        });
        
        DataT.on('datatable.page', function(p){
            fixPagination();
        });
        DataT.on('datatable.refresh', function(p){
            fixPagination();
        });
        DataT.on('datatable.update', function(p){
            fixPagination();
        });
        DataT.on('datatable.sort', function(p){
            fixPagination();
        });
        DataT.on('datatable.perpage', function(p){
            fixPagination();
        });
        DataT.on('datatable.search', function(p){
            fixPagination();
        });

        fixPagination();
    }
}


// function to add features to table element
function formatTable(table){



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

    

}




    //fix pagination function
    function fixPagination(){
        var as = $('ul.dataTable-pagination-list li a');
        
        for(var j = 0; j < as.length; j++){
            as[j].classList = "page-link";
        }
        var as = $('ul.dataTable-pagination-list li');
        for(var j = 0; j < as.length; j++){
            as[j].classList = "page-item";
        }
        nv = $('ul.dataTable-pagination-list');
        nv.addClass("pagination")
    }
    

    
