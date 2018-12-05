import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';
import { Principal } from 'app/core';
import { ClientLocationJobOrderService } from './client-location-job-order.service';

@Component({
    selector: 'jhi-client-location-job-order',
    templateUrl: './client-location-job-order.component.html'
})
export class ClientLocationJobOrderComponent implements OnInit, OnDestroy {
    clientLocations: IClientLocationJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientLocationService: ClientLocationJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.clientLocationService.query().subscribe(
            (res: HttpResponse<IClientLocationJobOrder[]>) => {
                this.clientLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClientLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClientLocationJobOrder) {
        return item.id;
    }

    registerChangeInClientLocations() {
        this.eventSubscriber = this.eventManager.subscribe('clientLocationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
