import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product/product-detail.guard';
import { ProductModule } from './product/product.module';
//a component should belong to only one module.
//a module defines the boundary or context within which
//the component resolves its directives and dependancies.


//there are two ways that a directive(eg: <pm-products></pm-products>)
//of a compoenent can be used within any components that are under a module.
//1) import the component into the current module.
//2)or import the module to which the component belongs to 
//  the current module.

//also the directives <..*ngIf> and <...  *ngFor> can be used
//within any of these components html as these directives are
//defined within the browserModule which we import (2nd method) 

//the ngModule directive is present in the FormsModule Directive. 



/*
For refactoring the code: into modules
1)First , we define a shared module => this module contains all the common 
      1)directives 
      2)pipes
      3)potential nested components
2)Second, we define other feature modules based on symantics, which may import this shared module
3)Third, in the root app module we import these feature modules, browser module and the routerModule for registeration.

*/
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    RouterModule.forRoot(
      [
       { path: 'welcome',component: WelcomeComponent},
       { path: '',redirectTo: 'welcome', pathMatch: 'full'},
       { path: '**',redirectTo: 'welcome',pathMatch: 'full'}
      ])
    ],
  bootstrap: [AppComponent]
    
})
export class AppModule { }
