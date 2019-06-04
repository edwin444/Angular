
import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError,tap } from 'rxjs/operators';


//Angular registers internally the HttpClient service to the module 
//called HttpClientModule, since the HttpClientModule
//is given as providers in root app module its services are available
//accross every component.
//We want Angular to get instance of this service , it is 
//done throught dependancy injection(ie defining the instance)
//in the constructor of class where we need to access
//the service

//two steps;
//1)register the services to the root Module
//by using providedIn:'root' or putting it in providers
//of appmodule or register the service to only
//a particular component by [providers] = service location
//in the particular component.
//2)next we need to create a dependancy injection or create
//an instance of this service inside any class(service or comp)
//to use it.This is done through the contructor. 

@Injectable({
    providedIn: 'root'
})
export class ProductService{

    //provider.json=>assets array.
    private productUrl = "api/products/products.json";
    constructor(private http: HttpClient){}
    
    //when we use pipe(operator1 defn, operator2 defn,...)
    //allows us to perform certain operations on the observables.
    //say map=> maps each marble in the observable pipe to desired marble given by defn
    // tap=>catches the marbles without changing it, used to log etc
    // catchError=> is used to catch all marbles when it comes and calls the exception handler 
    //              in the process. 
    // filter => only allows certain marbles passing through
    //           the observable pipes to actually 
    //           be retured to the subscriber based on filter defn.
    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        }
        else{
            errorMessage = `Server returned code: ${err.status}, error message is : ${err.message}`; 
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}