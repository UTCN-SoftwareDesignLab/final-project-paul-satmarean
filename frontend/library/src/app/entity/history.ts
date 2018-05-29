import {User} from './user';
import {Book} from './book';

export class History{
    id:number;
    book:Book;
    user:User;
    start_date:Date;
    end_date:Date;
    return_date:Date;
    status:Boolean;
}