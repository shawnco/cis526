import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../task/task.service';
import { WidgetService } from './widget.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [TaskService, WidgetService]
})
export class WidgetComponent implements OnInit
{
    showing: boolean;
    addingTask: boolean;
    newTaskText: string;
    newTaskRating: number;
    newTaskEnd: string;
    task: Object;
    data: Object[]; // data holds the results of the API call.
    test = 'yes';

    @Input()
    widget: Object;

    constructor(
        private taskService: TaskService,
        private widgetService: WidgetService,
        private sanitizer: DomSanitizer
    ){
    }

    ngOnInit(): void
    {
        this.widget['contentHTML'] = '';
        if(this.widget['api'] !== null){
            setInterval(()=>{
                var temp = this.widget['content'];
                this.widgetService.callAPI(this.widget['api'])
                    .subscribe((data: any)=>{

                        // Because Angular doesn't like to interpolate on strings
                        // I need to force this interpolation. It works, but only
                        // on top-level elements. It's a start, I suppose.
                        // I really think I'll need to add support for a parser
                        // Function either on front or back end that pre-processes
                        // the data before returning it.
                        var matches = this.widget['content'].match(/\{\{.*?\}\}/g);
                        for(var m in matches){
                            var pattern = matches[m].replace('{{', '').replace('}}', '');
                            console.log(data[pattern]);
                            temp = temp.replace(matches[m], data[pattern]);
                            console.log(this.widget['contentHTML']);
                        }
                        this.widget['contentHTML'] = temp;
                    });
            }, this.widget['refresh_rate']);
        }
    }

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