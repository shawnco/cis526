import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../task/task.service';
import { WidgetService } from './widget.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifyService } from './../notify/notify.service';
import { NotificationsService } from 'angular2-notifications-lite';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [TaskService, WidgetService, NotifyService]
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
    editing: boolean;
    removing: boolean;

    addingNotify: boolean;
    editingNotify: boolean;
    removingNotify: boolean;
    newNotify: Object = {
        type: '',
        threshold: 0
    };
    editNotify: Object = {
        type: '',
        threshold: 0
    };
    notifications: Object[];
    options = {
        position: ['bottom', 'left'],
        timeOut: 5000,
        lastOnBottom: true,
        showProgressBar: false
    };

    @Input()
    widget: Object;

    constructor(
        private taskService: TaskService,
        private widgetService: WidgetService,
        private sanitizer: DomSanitizer,
        private notifyService: NotifyService,
        private notificationsService: NotificationsService
    ){
    }

    ngOnInit(): void
    {
        this.widget['contentHTML'] = '';
        this.widgetService.getWidgetNotifications(this.widget['id'])
            .subscribe((data: Object[])=>{
                this.widget['notifications'] = data;
            });
        if(this.widget['api'] !== null){
            setInterval(()=>{
                var oldValue = parseInt(this.widget['contentHTML']);
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
                            temp = temp.replace(matches[m], data[pattern]);
                        }
                        this.widget['contentHTML'] = temp;
                        var newValue = parseInt(this.widget['contentHTML']);
                        // Loop through the notifications this widget has, and notify upon conditions being met.
                        this.notifications.forEach((notify: Object, index: number)=>{
                            if(notify['type'] === 'below' && newValue < notify['threshold']){
                                this.notificationsService.info(
                                    'Below Threshold',
                                    'The value of ' + this.widget['title'] + ' has fallen below the threshold of ' + notify['threshold']
                                );
                            }else if(notify['type'] === 'above' && newValue > notify['threshold']){
                                this.notificationsService.info(
                                    'Above Threshold',
                                    'The value of ' + this.widget['title'] + ' has risen above the threshold of ' + notify['threshold']
                                );
                            }else if(notify['type'] === 'change' && newValue !== oldValue){
                                this.notificationsService.info(
                                    'Value Changed',
                                    'The value of ' + this.widget['title'] + ' has changed from before'
                                );
                            }
                        })
                    });
            }, this.widget['refresh_rate']);
        }else{
            // Static value, just display.
            this.widget['contentHTML'] = this.widget['content'];
        }
        this.getNotifies();
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
                this.taskService.getWidgetTask(this.widget['id'])
                    .subscribe((data: Object)=>{
                        this.task = data;
                    });                
            });
    }

    openWidget(): void
    {
        // Grab the associated task for this, if one exists. 
        this.taskService.getWidgetTask(this.widget['id'])
            .subscribe((data: Object)=>{
                this.task = data;
                this.showing = true;
            });
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
                this.editing = false;
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
                this.removing = false;
            })
    }

    // Notifications
    getNotifies(): void
    {
        this.notifyService.getNotifies(this.widget['id'])
            .subscribe((data: Object[])=>{
                this.notifications = data;
            });
    }

    addNotify(): void
    {
        this.notifyService.addNotify(this.newNotify, this.widget['id'])
            .subscribe((data: boolean)=>{
                if(data === true){
                    console.log('Notification added!');
                    this.getNotifies();
                }else{
                    console.log('Notification not added');
                }
                this.addingNotify = false;
            })
    }

}