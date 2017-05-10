import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, TaskService]
})
export class AppComponent
{
    suggestion: Object = {};
    suggesting: boolean = false;

    constructor(
        private appService: AppService,
        private taskService: TaskService
    ){}

    suggest(): void
    {
        this.appService.suggest()
            .subscribe((data: Object)=>{
                console.log(data);
                this.suggestion = data;
                this.suggesting = true;
            });
    }

    completeSuggestion(): void
    {
        this.taskService.toggleChecked(this.suggestion['id'], 1)
            .subscribe((res: boolean)=>{
                this.suggesting = false;
            });
    }
}
