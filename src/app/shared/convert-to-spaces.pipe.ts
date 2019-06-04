import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpaces implements PipeTransform{
    //replaces the all occurences of character in value by ' ' here.
    transform(value: string,character: string):string{
        return value.replace(character,' ');
    }
}
