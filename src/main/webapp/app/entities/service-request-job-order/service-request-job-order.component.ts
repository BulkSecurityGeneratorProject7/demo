import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';
import { Principal } from 'app/core';
import { ServiceRequestJobOrderService } from './service-request-job-order.service';

@Component({
    selector: 'jhi-service-request-job-order',
    templateUrl: './service-request-job-order.component.html'
})
export class ServiceRequestJobOrderComponent implements OnInit, OnDestroy {
    serviceRequests: IServiceRequestJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private serviceRequestService: ServiceRequestJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.serviceRequestService.query().subscribe(
            (res: HttpResponse<IServiceRequestJobOrder[]>) => {
                this.serviceRequests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInServiceRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IServiceRequestJobOrder) {
        return item.id;
    }

    registerChangeInServiceRequests() {
        this.eventSubscriber = this.eventManager.subscribe('serviceRequestListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
