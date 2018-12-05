import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

@Component({
    selector: 'jhi-client-location-job-order-detail',
    templateUrl: './client-location-job-order-detail.component.html'
})
export class ClientLocationJobOrderDetailComponent implements OnInit {
    clientLocation: IClientLocationJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clientLocation }) => {
            this.clientLocation = clientLocation;
        });
    }

    previousState() {
        window.history.back();
    }
}
