import { Component,OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
    //selector: 'pm-products',
    templateUrl: './product-list.component.html',
    //the styleUrls applies a css format to that particular 
    //component.
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    //listFilter: string = 'cart';

    //syntax to use getter and setter methods on listFilter
    //the databinding automatically calls the getter and setter
    //methods when it needs to do the data binding.
    //so this.listFilter stores the value entered in filter text box.
    _listFilter:string;
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        //setting the filtered products to store values, 
        //that if _listFilter is empty the entire products
        //else only the filtered products.
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    //to store the filtered products in a temporary
    filteredProducts: IProduct[];
    //a generic data type array.
    products: IProduct[];
    errorMessage: any;

    constructor(private productService: ProductService){
        
    }
    
    //action taken by outer container when inner container
    //raises an event.
    onRatingClicked(message: string):void{
        this.pageTitle = 'Product List:'+message;
    }

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    //to implement the life cycle hook of any component namely
    //initialization which is one of the life cycle hook
    
    

    //observables are lazy and doesnt start
    //emmiting values unless and until
    //the observables are subscribed to. 
    ngOnInit(): void{
        console.log('In OnInit');
        this.productService.getProducts().subscribe(
            (products) => {
                this.products = products
                //observables are asynchronous.
                this.filteredProducts = this.products;
            },
            (error) => this.errorMessage = <any>error
        );
        
    }

    //to perform the filter of products on filterBy , if it exists
    //somewhere in a given product's name.
    performFilter(filterBy:string):IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
                            product.productName.toLocaleLowerCase().indexOf(filterBy)!== -1);
    }

    
}
