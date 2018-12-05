import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';
import { InvoiceJobOrderService } from './invoice-job-order.service';
import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';
import { ServiceRequestJobOrderService } from 'app/entities/service-request-job-order';

@Component({
    selector: 'jhi-invoice-job-order-update',
    templateUrl: './invoice-job-order-update.component.html'
})
export class InvoiceJobOrderUpdateComponent implements OnInit {
    invoice: IInvoiceJobOrder;
    isSaving: boolean;

    servicerequests: IServiceRequestJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceJobOrderService,
        private serviceRequestService: ServiceRequestJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
        this.serviceRequestService.query({ filter: 'invoice-is-null' }).subscribe(
            (res: HttpResponse<IServiceRequestJobOrder[]>) => {
                if (!this.invoice.serviceRequestId) {
                    this.servicerequests = res.body;
                } else {
                    this.serviceRequestService.find(this.invoice.serviceRequestId).subscribe(
                        (subRes: HttpResponse<IServiceRequestJobOrder>) => {
                            this.servicerequests = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceJobOrder>>) {
        result.subscribe((res: HttpResponse<IInvoiceJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackServiceRequestById(index: number, item: IServiceRequestJobOrder) {
        return item.id;
    }
}
