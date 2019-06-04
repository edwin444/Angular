import { Component, OnInit } from '@angular/core';
//below is a service which is registered with RouterModule
import { ActivatedRoute } from '@angular/router';
//below is also a service which is registered with the RouterModule
import { Router } from '@angular/router';



import { IProduct } from './product';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  imageWidth: number = 100;
  imageMargin: number = 2;
  pageTitle: string = 'Product Detail';
  product: IProduct;
  
  //activatedRoute Service is used to get a parameter passed 
  //from a the other component while routing via url to 
  //this component. we can find it by using snapshot.paramMap.get('name of param defined in routes in module')
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //parameter value we need to read
    //+ is used to convert the string to id. 
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle = ` : ${id}`;

    this.product = {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "https://d3h1zj156zzd4j.cloudfront.net/catalog/1-saw-ps-r7.jpg"
    }

   
  }

   //to navigate to another component by code
   onBack():void{
    this.router.navigate(['/products']);
  }

}
