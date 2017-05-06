import { Component, Input } from '@angular/core';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html'
})
export class WidgetComponent
{
    @Input()
    widget: Object
}