import { Headers, RequestOptions } from '@angular/http';

export class Constants
{
    static API = 'http://localhost:3123';
    static HEADERS = new Headers({'Content-Type': 'application/json'});
    static OPTIONS = new RequestOptions({headers: Constants.HEADERS});
}