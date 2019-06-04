import { Component,OnChanges, Input, EventEmitter} from '@angular/core';
import { Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl:'./star.component.html',
    styleUrls: ['./star.component.css']
})
//below StarComponent must implement the change
//function whenever the component changes
//so we implement another lifecycle hook of 
//a component known as the OnChanges
export class StarComponent implements OnChanges{


    //as we know the StarComponent is a nested component of the product list component which is its container
    //we can make the star component class attribute sensitive to changes in its container by putting the @Input()
    //decorator.
    @Input() rating: number = 4;
    starWidth: number;

    //@Output decorator is used by the child component
    //to communicate with the parent component 
    //and it can only pass events to the parent component.
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    

    //ngOnChanges() is triggered whenever there is changes in any of its attributes.
    ngOnChanges():void{
        //as width of total span of 5 stars is 75 
        //but coloured black star width must be the starWidth value
        //which is this.rating*75/5 as 5 stars are there.
        this.starWidth = this.rating*75/5;
    }
    onClick():void{
        //notice here that backticks were used to console log
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}

