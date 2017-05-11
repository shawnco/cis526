import { Injectable } from '@angular/core';
import { Constants } from './../app.constants';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable()
export class TaskService
{
    constructor(
        private http: Http
    ){}

    addTask(parentID: number, text: string, rating: number, end: string, widgetID: number): Observable<boolean>
    {
        var data = {
            parent_id: parentID,
            due_date: end,
            difficulty: rating,
            text: text,
            widget_id: widgetID
        };
        return this.http.post(Constants.API + '/task/add', data, Constants.OPTIONS)
            .map((res: Response)=>{
                return res.json();
            });
    }

    getChildren(parentID: number): Observable<Object[]>
    {
        return this.http.get('/task/children/' + parentID)
            .map((res: Response)=>{
                return res.json();
            });
    }

    getWidgetTask(widgetID: number): Observable<Object>
    {
        return this.http.get(Constants.API + '/widgetTask/' + widgetID)
            .map((res: Response)=>{
                return res.json();
            });
    }

    removeTask(widgetID: number): Observable<Object>
    {
        return this.http.post(Constants.API + '/widgetTask/remove/', {id: widgetID}, Constants.OPTIONS)
            .map((res: Response) =>{
                return res.json();
            });
    }

    toggleChecked(taskID: number, completed: number): Observable<boolean>
    {
        return this.http.post(Constants.API + '/task/toggle', {id: taskID, completed: completed}, Constants.OPTIONS)
            .map((res: Response)=>{
                return res.json();
            });
    }
}