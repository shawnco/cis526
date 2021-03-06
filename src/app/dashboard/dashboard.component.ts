import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WidgetService } from './../widget/widget.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [WidgetService]
})
export class DashboardComponent implements OnInit
{
    adding: boolean;
    id: number;
    widgets: Object[];
    
    widgetTitle: string;
    widgetContent: string;
    widgetApi: string;
    refreshRate: string;

    jsond: string;

    activeApis: Object[] = [];

    constructor(
        private route: ActivatedRoute,
        private widgetService: WidgetService
    ){}

    ngOnInit(): void
    {
        this.route.params.forEach((params: Params)=>{
            if(params['id'] !== null){
                this.id = +params['id'];
                this.getWidgets();
            }
        });
    }

    addWidget(): void
    {
        this.widgetService.addWidget(this.id, this.widgetTitle, this.widgetContent, this.widgetApi, parseInt(this.refreshRate))
            .subscribe((data: boolean) => {
                if(data === true){
                    console.log('Added widget!');
                    this.adding = false;
                    this.getWidgets();
                }else{
                    console.log('Error!');
                    this.adding = false;
                }
            });
    }

    getWidgets(): void
    {
        this.widgetService.getWidgets(this.id)
            .subscribe((data: Object[])=>{
                this.widgets = data;
                if(this.widgets.length === 0){
                    console.log('no widgets!');
                }else{
                    console.log(this.widgets);
                }
            });
    }

    updateList(e: any): void
    {
        this.getWidgets();
    }
}