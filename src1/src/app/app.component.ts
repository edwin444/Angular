import { Component, TemplateRef, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ButtonRendererComponent } from './button-renderer.component';
import { InnerModalComponent } from './inner-modal/inner-modal.component';
import { OuterModalComponent } from './outer-modal/outer-modal.component';
//refer: https://www.ag-grid.com/javascript-grid-data-update/    
//example updating transaction , see angular code


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //below is the datastore from backend
  attributeInfo = [
    {
      Attribute: "Attr 1",
      Values: ['T1','T2']
    },
    {
      Attribute: "Attr 2",
      Values: ['t1','t2','t3']
    }
  ];
  //below variable stores the selected rows values array
  selectedValues;

  name = 'Angular 6';
  frameworkComponents: any;
  rowSelection;
  rowDataClicked1 = {};


  //rowdata declaration.
  rowData: any[];
  //columns declaration.
  columnDefs: any[];
  //declaring apis
  private gridApi;
  private gridColumnApi;
  private context;

  modalRef: BsModalRef;

  //@ViewChild('template') template: ElementRef;
  constructor(public modalService: BsModalService,private http: HttpClient) {
    this.rowData = [
      {attribute:'Attr 1',region: 'NA',values: 'T1'},
      {attribute:'Attr 2',region: 'NA',values: 't3'},
    ];
    this.columnDefs = [
      {headerName: 'Attribute', field: 'attribute', sortable: true, filter: true,
      editable: false,
      rowDrag: true
      },
      {
        headerName: 'Region', 
        field: 'region', 
        sortable: true, 
        filter: true,
        editable: true
      },
      {
        headerName: 'Values', 
        field: 'values', 
        editable: true,
        cellEditor:'agSelectCellEditor',
        cellEditorParams: (params)=>{
          var selectedAttribute = params.data.attribute;
          //then we search the values for the chosen attribute and return
          //its options back.
          var valArray;
          for(var i of this.attributeInfo)
          {
            if(i.Attribute == selectedAttribute)
            {
              this.selectedValues = i.Values;
              return {
                values: i.Values
              };
            }
          }
        } 
      },
      {
        headerName: 'Modify',
        field: 'modify',
        cellRenderer: 'buttonRenderer',
        cellRendererParams:{
          onClick: this.onBtnClick1.bind(this),
          label:'Modify'
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
  ngOnInit(){
    
  }
  //when the grid is ready an event gets passed to the params
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.gridApi.refreshCells();
    //to make the columns fit to the size of the ag-grid
    this.gridApi.sizeColumnsToFit();
    
  }
  onBtnClick1(e){
    //here we have to open the modify model 
    //and also pass the current values to that model
    //how to pass the values ?
    this.openInnerModalComponent(e);
    console.log(e.rowData);
  }

  //to open inner modals.
  public openInnerModalComponent(e) {
    
    //step 1: I need to be able to call paramsEditor
    //as it gets called only during editing of the cell.
    var initialState = {valuesArray: this.selectedValues};
    //console.log("from outside"+initialState.valuesArray);
    this.modalRef = this.modalService.show(InnerModalComponent,Object.assign({},{class:'modal-lg'},{initialState}));
    //console.log(this.modalRef.componentInstance);
    /* this is how we open a Modal Component from another component */
    //this.modalRef.componentInstance.valuesArray = this.selectedValues;
    this.modalRef.content.action.subscribe((value)=>{
      console.log("Edited Values: "+value);
      //here also need to put the new values into the corresponding row's corresponding column cells
      //find corresponding node in the attribute info and edit it
      console.log(e);
      for (var i of this.attributeInfo)
      {
      
        if (e.rowData.attribute == i.Attribute)
        {
          //match found , so assign new values
          i.Values = value;
          break;
        }
      }
      //then refresh the api
      this.gridApi.redrawRows();
    });
  }
  //to open the outer modal.
  public openOuterModalComponent(){
    this.modalRef = this.modalService.show(OuterModalComponent);
    this.modalRef.content.action.subscribe((value)=>{
      console.log("Added [{values},newAttributeName]: "+value);
      
      
      var newItem = {
        Attribute: value[1],
        Values: value[0] //default value
      }
      this.attributeInfo.push(newItem);
      console.log(this.attributeInfo);

      var newRow = {
        attribute: value[1],
        region: 'NA',
        values: value[0][0]
      }
      this.gridApi.updateRowData({ add: [newRow] });
      //console.log(this.rowData);
      //then refresh the api to see the change
      this.gridApi.redrawRows();
    });
  }
  
}
