import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit
{
    widgets: Object[];
    
    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit(): void
    {

    }
}