import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';
import { Principal } from 'app/core';
import { ServiceRequestCartJobOrderService } from './service-request-cart-job-order.service';

@Component({
    selector: 'jhi-service-request-cart-job-order',
    templateUrl: './service-request-cart-job-order.component.html'
})
export class ServiceRequestCartJobOrderComponent implements OnInit, OnDestroy {
    serviceRequestCarts: IServiceRequestCartJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private serviceRequestCartService: ServiceRequestCartJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.serviceRequestCartService.query().subscribe(
            (res: HttpResponse<IServiceRequestCartJobOrder[]>) => {
                this.serviceRequestCarts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInServiceRequestCarts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IServiceRequestCartJobOrder) {
        return item.id;
    }

    registerChangeInServiceRequestCarts() {
        this.eventSubscriber = this.eventManager.subscribe('serviceRequestCartListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
