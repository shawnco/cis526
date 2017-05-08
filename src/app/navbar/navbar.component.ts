import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard/dashboard.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [DashboardService]
})
export class NavbarComponent
{
    @Input()
    dashboards: Object[];

    adding: boolean;
    newDashName: string; 
    
    constructor(private dashboardService: DashboardService){}

    ngOnInit(): void
    {
        this.getDashboards();
    }

    // Add a dashboard to the list.
    addDashboard(): void
    {
        this.dashboardService.addDashboard(this.newDashName)
            .subscribe((data: boolean)=>{
                if(data){
                    console.log('Added dashboard!');
                    this.adding = false;
                    this.getDashboards();
                }
            });
    }

    // Get dashboards
    getDashboards(): void
    {
        this.dashboardService.getDashboards()
            .subscribe((data: Object[])=>
            {
                console.log(data);
                this.dashboards = data;
            });
    }
}