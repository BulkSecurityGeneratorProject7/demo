import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

@Component({
    selector: 'jhi-service-request-cart-job-order-detail',
    templateUrl: './service-request-cart-job-order-detail.component.html'
})
export class ServiceRequestCartJobOrderDetailComponent implements OnInit {
    serviceRequestCart: IServiceRequestCartJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceRequestCart }) => {
            this.serviceRequestCart = serviceRequestCart;
        });
    }

    previousState() {
        window.history.back();
    }
}
