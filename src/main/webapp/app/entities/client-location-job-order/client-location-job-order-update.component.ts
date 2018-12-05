import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';
import { ClientLocationJobOrderService } from './client-location-job-order.service';
import { IClientJobOrder } from 'app/shared/model/client-job-order.model';
import { ClientJobOrderService } from 'app/entities/client-job-order';

@Component({
    selector: 'jhi-client-location-job-order-update',
    templateUrl: './client-location-job-order-update.component.html'
})
export class ClientLocationJobOrderUpdateComponent implements OnInit {
    clientLocation: IClientLocationJobOrder;
    isSaving: boolean;

    clients: IClientJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private clientLocationService: ClientLocationJobOrderService,
        private clientService: ClientJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clientLocation }) => {
            this.clientLocation = clientLocation;
        });
        this.clientService.query().subscribe(
            (res: HttpResponse<IClientJobOrder[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clientLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.clientLocationService.update(this.clientLocation));
        } else {
            this.subscribeToSaveResponse(this.clientLocationService.create(this.clientLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClientLocationJobOrder>>) {
        result.subscribe(
            (res: HttpResponse<IClientLocationJobOrder>) => this.onSaveSuccess(),
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClientById(index: number, item: IClientJobOrder) {
        return item.id;
    }
}
