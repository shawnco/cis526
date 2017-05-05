import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService 
{
    constructor(private http: Http){}

    getDashboards(): Observable<Object[]>
    {
        return this.http.get('http://localhost:3123/dashboards/list')
            .map((res: Response) => {
                return res.json();
            });
    }
}