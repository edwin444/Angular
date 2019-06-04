//interface to define the properties of
//the bussiness object.
//its to provide string typing
export interface IProduct{
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}

//we can also export a class that implements
//the given interface to provide a method etc.
//in this file
