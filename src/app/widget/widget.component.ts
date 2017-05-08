import { Component, Input } from '@angular/core';
import { TaskService } from './../task/task.service';
import { WidgetService } from './widget.service';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [TaskService, WidgetService]
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
        private taskService: TaskService,
        private widgetService: WidgetService
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

    removeWidget(): void
    {
        this.widgetService.removeWidget(this.widget['id'])
            .subscribe((data: boolean)=>{
                if(data === true){
                    console.log('widget removed!');
                }else{
                    console.log('error removing widget');
                }
            });
    }

    editWidget(): void
    {
        this.widgetService.editWidget(this.widget)
            .subscribe((data: boolean)=>{
                if(data === true){
                    console.log('Widget updated');
                }else{
                    console.log('Error updating widget');
                }
            });
    }

    removeTask(): void
    {
        this.taskService.removeTask(this.widget['id'])
            .subscribe((data: boolean)=>{
                if(data === true){
                    this.task = undefined;
                    console.log('Task removed!');
                }else{
                    console.log('Task not removed :(');
                }
            })
    }

}