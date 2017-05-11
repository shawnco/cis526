import { Component } from '@angular/core';
import { TaskService } from './task/task.service';
import { NotificationsService } from 'angular2-notifications-lite';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationsService]
})
export class AppComponent
{
    options = {
        position: ['top', 'left'],
        timeOut: 0,
        lastOnBottom: true
    };
    constructor(
        private notify: NotificationsService
    ){}
}
