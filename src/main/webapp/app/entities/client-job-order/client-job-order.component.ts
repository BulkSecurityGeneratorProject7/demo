import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClientJobOrder } from 'app/shared/model/client-job-order.model';
import { Principal } from 'app/core';
import { ClientJobOrderService } from './client-job-order.service';

@Component({
    selector: 'jhi-client-job-order',
    templateUrl: './client-job-order.component.html'
})
export class ClientJobOrderComponent implements OnInit, OnDestroy {
    clients: IClientJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientService: ClientJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.clientService.query().subscribe(
            (res: HttpResponse<IClientJobOrder[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClientJobOrder) {
        return item.id;
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
