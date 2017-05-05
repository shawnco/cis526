import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../app.constants';
import { Observable } from 'rxjs';

Injectable()
export class WidgetService
{
    constructor(
        private http: Http
    ){}

    getWidgets(dashID: string): Observable<Object[]>
    {
        return this.http.get(Constants.API + '/widgets/get/' + dashID)
            .map((res: Response) =>
            {
                return res.json();
            });
    }
}