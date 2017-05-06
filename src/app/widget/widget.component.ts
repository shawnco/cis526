import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnInit
{
    @Input()
    widgets: Object[];
    ngOnInit(): void {
        console.log(this.widgets);
    }
}