import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard/dashboard.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [DashboardService]
})
export class AppComponent implements OnInit {
    dashboards: Object[];
    constructor(private dashboardService: DashboardService){}

    ngOnInit(): void
    {
        this.dashboardService.getDashboards()
            .subscribe((data: Object[])=>
            {
                console.log(data);
                this.dashboards = data;
            });
    }
}
