import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';

@Component({
    selector: 'jhi-job-history-job-order-detail',
    templateUrl: './job-history-job-order-detail.component.html'
})
export class JobHistoryJobOrderDetailComponent implements OnInit {
    jobHistory: IJobHistoryJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            this.jobHistory = jobHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
