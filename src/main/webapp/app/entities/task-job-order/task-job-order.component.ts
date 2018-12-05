import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';
import { Principal } from 'app/core';
import { TaskJobOrderService } from './task-job-order.service';

@Component({
    selector: 'jhi-task-job-order',
    templateUrl: './task-job-order.component.html'
})
export class TaskJobOrderComponent implements OnInit, OnDestroy {
    tasks: ITaskJobOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taskService: TaskJobOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.taskService.query().subscribe(
            (res: HttpResponse<ITaskJobOrder[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaskJobOrder) {
        return item.id;
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
