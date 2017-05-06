import { Component, Input } from '@angular/core';
import { TaskService } from './../task/task.service';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [TaskService]
})
export class WidgetComponent
{
    showing: boolean;
    addingTask: boolean;
    newTaskText: string;
    newTaskRating: number;
    newTaskEnd: string;
    task: Object;

    @Input()
    widget: Object

    constructor(
        private taskService: TaskService
    ){}

    addWidgetTask(): void
    {
        this.taskService.addTask(0, this.newTaskText, this.newTaskRating, this.newTaskEnd, this.widget['id'])
            .subscribe((data: boolean)=>{
                if(data == true){
                    console.log('Task added!');
                }else{
                    console.log('Task not added.');
                }
                this.addingTask = false;
            });
    }

    openWidget(): void
    {
        // Grab the associated task for this, if one exists. 
        this.taskService.getWidgetTask(this.widget['id'])
            .subscribe((data: Object)=>{
                this.task = data;
                this.showing = true;
            })
    }
}