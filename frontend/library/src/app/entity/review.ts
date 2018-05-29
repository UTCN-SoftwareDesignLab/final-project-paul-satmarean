import {User} from './user';
import {Book} from './book';

export class Review{
    id:number;
    book:Book;
    user:User;
    review:string;
}