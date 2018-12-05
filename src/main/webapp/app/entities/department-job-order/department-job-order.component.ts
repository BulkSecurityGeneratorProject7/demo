import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { Principal } from 'app/core';
import { DepartmentJobOrderService } from './department-job-order.service';

@Component({
    selector: 'jhi-department-job-order',
    templateUrl: './department-job-order.component.html'
})
export class DepartmentJobOrderComponent implements OnInit, OnDestroy {
    departments: IDepartmentJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private departmentService: DepartmentJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.departmentService.query().subscribe(
            (res: HttpResponse<IDepartmentJobOrder[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDepartments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDepartmentJobOrder) {
        return item.id;
    }

    registerChangeInDepartments() {
        this.eventSubscriber = this.eventManager.subscribe('departmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
