import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WidgetService } from './../widget/widget.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: [WidgetService]
})
export class DashboardComponent implements OnInit
{
    widgets: Object[];
    
    constructor(
        private route: ActivatedRoute,
        private widgetService: WidgetService
    ){}

    ngOnInit(): void
    {
        this.route.params
            .map((params: Params)=>{
                console.log(params);
                if(params['id']){
                    var id = params['id'];
                    this.widgetService.getWidgets(id)
                        .subscribe((data: Object[])=>{
                            this.widgets = data;
                            if(this.widgets.length === 0){
                                console.log('no widgets!');
                            }else{
                                console.log(this.widgets);
                            }
                        });
                }
            });
    }

    addWidget(): void
    {
    }
}