import { Component, Input } from '@angular/core';

@Component({
    selector: 'task',
    templateUrl: './task.component.html',
})
export class TaskComponent
{
    @Input()
    task: Object;
}