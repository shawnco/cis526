import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Constants } from './app.constants';

@Injectable()
export class AppService
{
    constructor(
        private http: Http
    ){}

    suggest(): Observable<Object>
    {
        return this.http.get(Constants.API + '/suggest')
            .map((res: Response)=>{
                return res.json();
            });
    }
}