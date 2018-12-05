import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationJobOrder } from 'app/shared/model/location-job-order.model';

@Component({
    selector: 'jhi-location-job-order-detail',
    templateUrl: './location-job-order-detail.component.html'
})
export class LocationJobOrderDetailComponent implements OnInit {
    location: ILocationJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }
}
