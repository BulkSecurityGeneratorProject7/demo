import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';
import { Principal } from 'app/core';
import { CompanyJobOrderService } from './company-job-order.service';

@Component({
    selector: 'jhi-company-job-order',
    templateUrl: './company-job-order.component.html'
})
export class CompanyJobOrderComponent implements OnInit, OnDestroy {
    companies: ICompanyJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companyService: CompanyJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompanyJobOrder[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyJobOrder) {
        return item.id;
    }

    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('companyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
