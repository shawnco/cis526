import { Component, Input } from '@angular/core';
import { DashboardService } from './../dashboard/dashboard.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent
{
    @Input()
    dashboards: Object[];

    newDashName: string; 
    
    constructor(
        private dashboardService: DashboardService
    ){}

    // Add a dashboard to the list.
    addDashboard(): void
    {
        var newDashName = prompt('Name of new dashboard: ');
        this.dashboardService.addDashboard(newDashName)
            .subscribe((data: boolean)=>{
                if(data){
                    console.log('Added dashboard!');
                }
            });
    }
}