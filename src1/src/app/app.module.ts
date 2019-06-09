import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgGridModule } from 'ag-grid-angular';

import { HttpClientModule } from '@angular/common/http';
import { ButtonRendererComponent } from './button-renderer.component';
import { InnerModalComponent } from './inner-modal/inner-modal.component';
import { OuterModalComponent } from './outer-modal/outer-modal.component';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    ModalModule.forRoot(),
    AgGridModule.withComponents([ButtonRendererComponent]),
    HttpClientModule
   ],
  declarations: [ AppComponent,ButtonRendererComponent, InnerModalComponent, OuterModalComponent],
  bootstrap:    [ AppComponent ],
  entryComponents: [ InnerModalComponent,OuterModalComponent ]
})
export class AppModule { }
