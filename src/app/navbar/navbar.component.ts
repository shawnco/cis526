import { Component, Input } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent
{
    @Input()
    dashboards: Object[];

    constructor(){console.log(this.dashboards);}
}