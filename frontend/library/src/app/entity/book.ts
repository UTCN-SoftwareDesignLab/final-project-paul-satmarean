import {Genre} from './genre';
import {Author} from './author';

export class Book{
    id:number;
    title:string;
    quantity:number;
    available:number;
    authors:Author[];
    genres:Genre[];
    picture:string;
}