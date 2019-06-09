// Author: T4professor

import { Component,ElementRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-button-renderer',
  template: `
    <button #btnName type="button" class="btn btn-primary" (click)="onClick($event)">{{label}}</button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  @ViewChild('btnName') btnElement;

  params;
  label: string;
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      //also toggle undo to delete and vice versa
      //var temp = document.getElementsByTagName("button")[0];
      //to get the text on the button clicked 
      var temp = this.btnElement.nativeElement;
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        rowNodeClicked: this.params.node,//.childIndex,
        text: temp
        
        // ...something
      }
      //console.log("Onclick"+JSON.stringify(this.params.node.data));
      //code to pass the pressed buttons row number to the parent context , here the table
      //this.params.context.componentParent.addItemsAtIndex(this.params.node.rowIndex+1);
      //console.log("Clicked Row: "+ (this.params.node.rowIndex+1));
      //, Col: ${this.params.colDef.headerName}`);
      this.params.onClick(params);
    }
  }
}