import { NgModule } from '@angular/core';
//below has ngIf and ngFor
//browser module imports and exports the CommonModule 
//that is the reason why we have access to those 
//directives in any of our modules.
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpaces } from '../shared/convert-to-spaces.pipe';

import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpaces,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
       { path: 'products', component: ProductListComponent },
       { path: 'products/:id',
         //canActivate puts a route guard on this url
         //based on the check provided by all the
         //route guards specified in ProductDetailGuard.
         canActivate: [ ProductDetailGuard ],
         component: ProductDetailComponent },
      ]),
    SharedModule
  ]
})
export class ProductModule { }
