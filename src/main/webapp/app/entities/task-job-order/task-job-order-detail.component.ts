import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';

@Component({
    selector: 'jhi-task-job-order-detail',
    templateUrl: './task-job-order-detail.component.html'
})
export class TaskJobOrderDetailComponent implements OnInit {
    task: ITaskJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
    }

    previousState() {
        window.history.back();
    }
}
