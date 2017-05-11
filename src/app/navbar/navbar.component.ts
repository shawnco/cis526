import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard/dashboard.service';
import { SuggestService } from './../suggest/suggest.service';
import { TaskService } from './../task/task.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [DashboardService, SuggestService, TaskService]
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
    suggesting: boolean;
    suggestion: Object = {};
    
    constructor(
        private dashboardService: DashboardService,
        private suggestService: SuggestService,
        private taskService: TaskService
    ){}

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

    suggest(): void
    {
        this.suggestService.suggest()
            .subscribe((data: Object)=>{
                this.suggestion = data;
                this.suggesting = true;
            });
    }

    completeSuggestion(): void
    {
        this.taskService.toggleChecked(this.suggestion['id'], 1)
            .subscribe((res: boolean)=>{
                this.suggesting = false;
            });
    }

}