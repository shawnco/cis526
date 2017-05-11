import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class NotifyService
{
    constructor(
        private http: Http
    ){}

    addNotify(notify: Object, widgetID: number): Observable<boolean>
    {
        notify['widget_id'] = widgetID
        return this.http.post('/notification/add', notify, Constants.OPTIONS)
            .map((res: Response)=>{
                return res.json();
            });
    }

    getNotifies(widgetID: number): Observable<Object[]>
    {
        return this.http.get('/notifications/' + widgetID)
            .map((res: Response)=>{
                return res.json();
            });
    }
}