import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';
import { ServiceRequestJobOrderService } from './service-request-job-order.service';
import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';
import { InvoiceJobOrderService } from 'app/entities/invoice-job-order';
import { IJobJobOrder } from 'app/shared/model/job-job-order.model';
import { JobJobOrderService } from 'app/entities/job-job-order';
import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';
import { ClientLocationJobOrderService } from 'app/entities/client-location-job-order';
import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';
import { ServiceRequestCartJobOrderService } from 'app/entities/service-request-cart-job-order';

@Component({
    selector: 'jhi-service-request-job-order-update',
    templateUrl: './service-request-job-order-update.component.html'
})
export class ServiceRequestJobOrderUpdateComponent implements OnInit {
    serviceRequest: IServiceRequestJobOrder;
    isSaving: boolean;

    invoices: IInvoiceJobOrder[];

    jobs: IJobJobOrder[];

    clientlocations: IClientLocationJobOrder[];

    servicerequestcarts: IServiceRequestCartJobOrder[];
    startTime: string;
    endTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private serviceRequestService: ServiceRequestJobOrderService,
        private invoiceService: InvoiceJobOrderService,
        private jobService: JobJobOrderService,
        private clientLocationService: ClientLocationJobOrderService,
        private serviceRequestCartService: ServiceRequestCartJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ serviceRequest }) => {
            this.serviceRequest = serviceRequest;
            this.startTime = this.serviceRequest.startTime != null ? this.serviceRequest.startTime.format(DATE_TIME_FORMAT) : null;
            this.endTime = this.serviceRequest.endTime != null ? this.serviceRequest.endTime.format(DATE_TIME_FORMAT) : null;
        });
        this.invoiceService.query({ filter: 'servicerequest-is-null' }).subscribe(
            (res: HttpResponse<IInvoiceJobOrder[]>) => {
                if (!this.serviceRequest.invoiceId) {
                    this.invoices = res.body;
                } else {
                    this.invoiceService.find(this.serviceRequest.invoiceId).subscribe(
                        (subRes: HttpResponse<IInvoiceJobOrder>) => {
                            this.invoices = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.jobService.query().subscribe(
            (res: HttpResponse<IJobJobOrder[]>) => {
                this.jobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clientLocationService.query().subscribe(
            (res: HttpResponse<IClientLocationJobOrder[]>) => {
                this.clientlocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.serviceRequestCartService.query().subscribe(
            (res: HttpResponse<IServiceRequestCartJobOrder[]>) => {
                this.servicerequestcarts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.serviceRequest.startTime = this.startTime != null ? moment(this.startTime, DATE_TIME_FORMAT) : null;
        this.serviceRequest.endTime = this.endTime != null ? moment(this.endTime, DATE_TIME_FORMAT) : null;
        if (this.serviceRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceRequestService.update(this.serviceRequest));
        } else {
            this.subscribeToSaveResponse(this.serviceRequestService.create(this.serviceRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServiceRequestJobOrder>>) {
        result.subscribe(
            (res: HttpResponse<IServiceRequestJobOrder>) => this.onSaveSuccess(),
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

    trackInvoiceById(index: number, item: IInvoiceJobOrder) {
        return item.id;
    }

    trackJobById(index: number, item: IJobJobOrder) {
        return item.id;
    }

    trackClientLocationById(index: number, item: IClientLocationJobOrder) {
        return item.id;
    }

    trackServiceRequestCartById(index: number, item: IServiceRequestCartJobOrder) {
        return item.id;
    }
}
