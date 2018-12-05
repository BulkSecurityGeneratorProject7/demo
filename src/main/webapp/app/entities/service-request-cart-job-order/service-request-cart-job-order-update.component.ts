import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';
import { ServiceRequestCartJobOrderService } from './service-request-cart-job-order.service';

@Component({
    selector: 'jhi-service-request-cart-job-order-update',
    templateUrl: './service-request-cart-job-order-update.component.html'
})
export class ServiceRequestCartJobOrderUpdateComponent implements OnInit {
    serviceRequestCart: IServiceRequestCartJobOrder;
    isSaving: boolean;
    date: string;

    constructor(private serviceRequestCartService: ServiceRequestCartJobOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ serviceRequestCart }) => {
            this.serviceRequestCart = serviceRequestCart;
            this.date = this.serviceRequestCart.date != null ? this.serviceRequestCart.date.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.serviceRequestCart.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.serviceRequestCart.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceRequestCartService.update(this.serviceRequestCart));
        } else {
            this.subscribeToSaveResponse(this.serviceRequestCartService.create(this.serviceRequestCart));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServiceRequestCartJobOrder>>) {
        result.subscribe(
            (res: HttpResponse<IServiceRequestCartJobOrder>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
