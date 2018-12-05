import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';
import { TaskJobOrderService } from './task-job-order.service';
import { IJobJobOrder } from 'app/shared/model/job-job-order.model';
import { JobJobOrderService } from 'app/entities/job-job-order';

@Component({
    selector: 'jhi-task-job-order-update',
    templateUrl: './task-job-order-update.component.html'
})
export class TaskJobOrderUpdateComponent implements OnInit {
    task: ITaskJobOrder;
    isSaving: boolean;

    jobs: IJobJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private taskService: TaskJobOrderService,
        private jobService: JobJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
        this.jobService.query().subscribe(
            (res: HttpResponse<IJobJobOrder[]>) => {
                this.jobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaskJobOrder>>) {
        result.subscribe((res: HttpResponse<ITaskJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackJobById(index: number, item: IJobJobOrder) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
