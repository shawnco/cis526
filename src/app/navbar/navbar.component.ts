import { Component, Input } from '@angular/core';
import { DashboardService } from './../dashboard/dashboard.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
    @Input()
    dashboards: Object[];

    adding: boolean;
    newDashName: string; 
    
    constructor(
        private dashboardService: DashboardService
    ){}

    // Add a dashboard to the list.
    addDashboard(): void
    {
        this.dashboardService.addDashboard(this.newDashName)
            .subscribe((data: boolean)=>{
                if(data){
                    console.log('Added dashboard!');
                    this.adding = false;
                }
            });
    }
}