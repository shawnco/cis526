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

    callAPI(url: string): Observable<Object>
    {
        return this.http.get(url)
            .map((res: Response)=>{
                return res.json();
            });
    }

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
            refresh_rate: refreshRate
        };
        return this.http.post(Constants.API + '/widget/add', data, Constants.OPTIONS)
            .map((res: Response)=>
            {
                return res.json();
            });
    }

    removeWidget(widgetID: number): Observable<boolean>
    {
        return this.http.post(Constants.API + '/widget/remove', {id: widgetID}, Constants.OPTIONS)
            .map((res: Response)=>{
                return res.json();
            });
    }

    editWidget(widget: Object): Observable<boolean>
    {
        return this.http.post(Constants.API + '/widget/update', widget, Constants.OPTIONS)
            .map((res: Response)=>{
                return res.json();
            });
    }

    getWidgetNotifications(id: number): Observable<Object[]>
    {
        return this.http.get(Constants.API + '/notifications/' + id)
            .map((res: Response)=>{
                return res.json();
            });
    }
}