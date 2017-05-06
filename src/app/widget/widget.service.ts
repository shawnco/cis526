import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from './../app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class WidgetService
{
    constructor(
        private http: Http
    ){}

    getWidgets(dashID: number): Observable<Object[]>
    {
        return this.http.get(Constants.API + '/widgets/get/' + dashID)
            .map((res: Response) =>
            {
                return res.json();
            });
    }

    addWidget(dashID: number, widgetTitle: string, widgetContent: string, widgetApi: string, refreshRate: number): Observable<boolean>
    {
        var data = {
            dashboard_id: dashID,
            title: widgetTitle,
            content: widgetContent,
            api: widgetApi,
            refresh_rate: 1000 * refreshRate
        };
        console.log(data);
        return this.http.post(Constants.API + '/widget/add', data, Constants.OPTIONS)
            .map((res: Response)=>
            {
                return res.json();
            });
    }
}