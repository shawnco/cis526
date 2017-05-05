import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Constants } from './../app.constants';

@Injectable()
export class DashboardService 
{
    constructor(private http: Http){}

    addDashboard(newDashName: string): Observable<boolean>
    {
        console.log(newDashName);
        return this.http.post(Constants.API + '/dashboard/add', {name: newDashName}, Constants.OPTIONS)
            .map((res: Response)=>
            {
                return res.json();
            });
    }

    getDashboards(): Observable<Object[]>
    {
        return this.http.get(Constants.API + '/dashboards/list')
            .map((res: Response) => {
                return res.json();
            });
    }
}