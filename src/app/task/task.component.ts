import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit
{
    @Input()
    task: Object;
    children: Object[];
    addingChild: boolean;
    child = {
        text: '',
        due: '',
        rating: 0
    };

    constructor(
        private taskService: TaskService
    ){}

    ngOnInit(): void
    {
        if(this.task['completed'] === 1){
            this.task['completed'] = true;
        }else{
            this.task['completed'] = false;
        }
        this.taskService.getChildren(this.task['id'])
            .subscribe((data: Object[])=>{
                this.children = data;
            });
    }

    getChildren(): void
    {
        this.taskService.getChildren(this.task['id'])
            .subscribe((data: Object[])=>{
                this.children = data;
            });
    }

    addChildTask(): void
    {
        this.taskService.addTask(this.task['id'], this.child.text, this.child.rating, this.child.due, null)
            .subscribe((data: boolean)=>{
                if(data === true){
                    console.log('child task added');
                    this.getChildren();
                }else{
                    console.log('child task no added');
                }
                this.addingChild = false;
            });
    }

    toggleChecked(): void
    {
        var completed: number;
        if(this.task['completed'] === false){
            this.task['completed'] = true;
            completed = 1;
        }else{
            this.task['completed'] = false;
            completed = 0;
        }
        this.taskService.toggleChecked(this.task['id'], completed)
            .subscribe((data: boolean)=>{
                if(data === true){
                    console.log('updated');
                }else{
                    console.log('not updated');
                }
            });
    }
}