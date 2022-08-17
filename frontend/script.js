const {ipcRenderer} = require('electron');

//require( "vanilla-datatables" )

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

    
} );

//function to get all tables on the page
function FormatAllTables(){
   tables = document.getElementsByTagName('table');


    // format each table in tables
    for(var i = 0; i < tables.length; i++){
        T = tables[i];



        formatTable(T);
        var DataT = new DataTable(T,{
            plugins: {
                editable: {
                    enabled: true,
                    contextMenu: true,
                    hiddenColumns: true,
                    menuItems: [
                        {
                            text: "<span class='mdi mdi-lead-pencil'></span> Edit Cell",
                            action: function() {
                                this.editCell();
                            }
                        },
                        {
                            text: "<span class='mdi mdi-lead-pencil'></span> Edit Row",
                            action: function() {
                                this.editRow();
                            }
                        },			
                        {
                            separator: true
                        },
                        {
                            text: "<span class='mdi mdi-delete'></span> Remove",
                            action: function() {
                                if ( confirm("Are you sure?") ) {
                                    this.removeRow();
                                }
                            }
                        }
                    ]
                }
            }
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

    

    return tables;
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
        var as = $('div.dataTable-pagination li a');
        
        for(var j = 0; j < as.length; j++){
            as[j].classList = "page-link";
        }
        var as = $('div.dataTable-pagination li');
        for(var j = 0; j < as.length; j++){
            as[j].classList = "page-item";
        }
        nv = $('div.dataTable-pagination');
        nv.addClass("pagination m-1 p-1");



        tt =  $('div.dataTable-top');
        tt.addClass("m-1 p-1 row g-3");
    }
    

    
