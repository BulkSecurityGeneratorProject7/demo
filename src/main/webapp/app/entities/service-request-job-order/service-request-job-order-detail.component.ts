import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

@Component({
    selector: 'jhi-service-request-job-order-detail',
    templateUrl: './service-request-job-order-detail.component.html'
})
export class ServiceRequestJobOrderDetailComponent implements OnInit {
    serviceRequest: IServiceRequestJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceRequest }) => {
            this.serviceRequest = serviceRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
