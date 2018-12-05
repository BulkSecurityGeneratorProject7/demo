import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClientJobOrder } from 'app/shared/model/client-job-order.model';
import { ClientJobOrderService } from './client-job-order.service';

@Component({
    selector: 'jhi-client-job-order-update',
    templateUrl: './client-job-order-update.component.html'
})
export class ClientJobOrderUpdateComponent implements OnInit {
    client: IClientJobOrder;
    isSaving: boolean;

    constructor(private clientService: ClientJobOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ client }) => {
            this.client = client;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(this.clientService.create(this.client));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClientJobOrder>>) {
        result.subscribe((res: HttpResponse<IClientJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
