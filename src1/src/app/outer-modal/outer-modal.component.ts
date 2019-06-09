import { Component, TemplateRef, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs';


import { ButtonRendererComponent } from '../button-renderer.component';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-outer-modal',
  templateUrl: './outer-modal.component.html',
  styleUrls: ['./outer-modal.component.css']
})
export class OuterModalComponent implements OnInit {
 
  @Output() action = new EventEmitter();

  newAttributeName;
  frameworkComponents: any;
  rowSelection;
  rowDataClicked1 = {};
  rowDataClicked2 = {};


  //rowdata declaration.
  rowData: any[] = [];
  //columns declaration.
  columnDefs: any[];
  //declaring apis
  private gridApi;
  private gridColumnApi;

  private context;
  constructor(public modalService: BsModalService) {
    //one row not filled to enter the values.
    this.rowData = [
      {value:""}
    ] 
    this.columnDefs = [
      {headerName: 'Value', field: 'value', sortable: true, filter: true,
      editable: true,
      rowDrag: true
      },
      {
        headerName: 'Add', 
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: ' add '
        }
      },
      {
        headerName: ' Remove ',
        field: 'delete',
        cellRenderer: 'buttonRenderer',
        cellRendererParams:{
          onClick: this.onBtnClick2.bind(this),
          label:' delete '
        }
      }
    ];
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
    this.rowSelection = "multiple";
    //setting the context
    this.context = { componentParent: this };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    //to make the columns fit to the size of the ag-grid
    this.gridApi.sizeColumnsToFit();
  }
  //utility function to create a new row
  newCount = 1;
  createNewRowData(){
    var newData = {
      value: "Enter new Value"//+ this.newCount
    };
    this.newCount++;
    return newData;
  }
  //utlility function to add a row
  onAddRow(){
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    //printResult(res);
  }
  //to add a item to a specified index
  //this is called from the child component to add a row to 
  //the model.
  addItemsAtIndex(index){
    console.log("Recieved by parent"+(index));
    var newItems = [this.createNewRowData()]; //createNewRowData(), createNewRowData()];
    var res = this.gridApi.updateRowData({
      add: newItems,
      addIndex: index
    });
    //printResult(res);
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
  }
  //to close
  doAction(){
     //have to close modal
     this.modalService.hide(1);
  }
  //when the button is clicked 
  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    //Add a row just below the current clicked index
    //this.addItemsAtIndex(e.indexOfRowSelected+1);
    //get the rowNode which is clicked.
    var nodeClicked = e.rowNodeClicked;

    this.gridApi.forEachNodeAfterFilterAndSort((node,index)=>{
      if (node == nodeClicked)
      {
        this.addItemsAtIndex(index+1);
        console.log(`${index}+"  "+${nodeClicked.childIndex}`);
      }
    });
  }
  //to display the finally editted columns
  getAllDisplayedRows(){
    //variable to store the final attributes.
    var newValues = [];
    var count = this.gridApi.getDisplayedRowCount();
    console.log("## printAllDisplayedRows");
    for (var i = 0; i < count; i++){
      //code for printing the gridOptions.
      var RowNode = this.gridApi.getDisplayedRowAtIndex(i);
      var params = { columns: ['delete'], rowNodes: [RowNode]};
      var instances = this.gridApi.getCellRendererInstances(params);
      if (instances[0]._eGui.innerText == "delete")
        newValues.push(RowNode.data.value);
      //console.log(instances[0]._eGui.innerText);
      //console.log(rowNode.data.value);
    }
    console.log(newValues);
    //passing the new editted values to the parent component.
    this.action.emit([newValues,this.newAttributeName]);
    //to close the modal
    this.doAction();
    
  }
  onBtnClick2(e) {  
    console.log("Button clicked");
    let rowNode = this.gridApi.getDisplayedRowAtIndex(e.indexOfRowSelected);
    console.log(e.text);
    if (e.text.firstChild.nodeValue == "undo")
      e.text.firstChild.nodeValue = "delete";
    else
      e.text.firstChild.nodeValue = "undo";
  }

}
