import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientJobOrder } from 'app/shared/model/client-job-order.model';

@Component({
    selector: 'jhi-client-job-order-detail',
    templateUrl: './client-job-order-detail.component.html'
})
export class ClientJobOrderDetailComponent implements OnInit {
    client: IClientJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ client }) => {
            this.client = client;
        });
    }

    previousState() {
        window.history.back();
    }
}
