import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IJobJobOrder } from 'app/shared/model/job-job-order.model';
import { JobJobOrderService } from './job-job-order.service';
import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';
import { EmployeeJobOrderService } from 'app/entities/employee-job-order';
import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';
import { TaskJobOrderService } from 'app/entities/task-job-order';

@Component({
    selector: 'jhi-job-job-order-update',
    templateUrl: './job-job-order-update.component.html'
})
export class JobJobOrderUpdateComponent implements OnInit {
    job: IJobJobOrder;
    isSaving: boolean;

    employees: IEmployeeJobOrder[];

    tasks: ITaskJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private jobService: JobJobOrderService,
        private employeeService: EmployeeJobOrderService,
        private taskService: TaskJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ job }) => {
            this.job = job;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeJobOrder[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITaskJobOrder[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(this.jobService.create(this.job));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobJobOrder>>) {
        result.subscribe((res: HttpResponse<IJobJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmployeeById(index: number, item: IEmployeeJobOrder) {
        return item.id;
    }

    trackTaskById(index: number, item: ITaskJobOrder) {
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
