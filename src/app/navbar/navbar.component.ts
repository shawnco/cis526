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
    editDash: Object;
    editing: boolean;
    removeDash: Object;
    removing: boolean;
    
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

    // Edit the content of a dashboard
    editDashboard(): void
    {
        this.dashboardService.updateDashboard(this.editDash)
            .subscribe((data: boolean)=>{
                if(data){
                    console.log('Dashboard updated!');
                    this.editing = false;
                    this.getDashboards();
                }
            })
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

    // Remove dashboard altogether
    removeDashboard(): void
    {
        this.dashboardService.removeDashboard(this.removeDash['id'])
            .subscribe((data: boolean)=>{
                console.log('Dashboard removed!');
                this.removing = false;
                this.getDashboards();
            })
    }
}