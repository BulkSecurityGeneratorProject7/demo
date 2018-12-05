import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobJobOrder } from 'app/shared/model/job-job-order.model';

@Component({
    selector: 'jhi-job-job-order-detail',
    templateUrl: './job-job-order-detail.component.html'
})
export class JobJobOrderDetailComponent implements OnInit {
    job: IJobJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ job }) => {
            this.job = job;
        });
    }

    previousState() {
        window.history.back();
    }
}
