import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IJobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';
import { JobHistoryJobOrderService } from './job-history-job-order.service';
import { IJobJobOrder } from 'app/shared/model/job-job-order.model';
import { JobJobOrderService } from 'app/entities/job-job-order';
import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { DepartmentJobOrderService } from 'app/entities/department-job-order';
import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';
import { EmployeeJobOrderService } from 'app/entities/employee-job-order';
import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';
import { InvoiceJobOrderService } from 'app/entities/invoice-job-order';

@Component({
    selector: 'jhi-job-history-job-order-update',
    templateUrl: './job-history-job-order-update.component.html'
})
export class JobHistoryJobOrderUpdateComponent implements OnInit {
    jobHistory: IJobHistoryJobOrder;
    isSaving: boolean;

    jobs: IJobJobOrder[];

    departments: IDepartmentJobOrder[];

    employees: IEmployeeJobOrder[];

    invoices: IInvoiceJobOrder[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private jobHistoryService: JobHistoryJobOrderService,
        private jobService: JobJobOrderService,
        private departmentService: DepartmentJobOrderService,
        private employeeService: EmployeeJobOrderService,
        private invoiceService: InvoiceJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            this.jobHistory = jobHistory;
            this.startDate = this.jobHistory.startDate != null ? this.jobHistory.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.jobHistory.endDate != null ? this.jobHistory.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.jobService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IJobJobOrder[]>) => {
                if (!this.jobHistory.jobId) {
                    this.jobs = res.body;
                } else {
                    this.jobService.find(this.jobHistory.jobId).subscribe(
                        (subRes: HttpResponse<IJobJobOrder>) => {
                            this.jobs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.departmentService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IDepartmentJobOrder[]>) => {
                if (!this.jobHistory.departmentId) {
                    this.departments = res.body;
                } else {
                    this.departmentService.find(this.jobHistory.departmentId).subscribe(
                        (subRes: HttpResponse<IDepartmentJobOrder>) => {
                            this.departments = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IEmployeeJobOrder[]>) => {
                if (!this.jobHistory.employeeId) {
                    this.employees = res.body;
                } else {
                    this.employeeService.find(this.jobHistory.employeeId).subscribe(
                        (subRes: HttpResponse<IEmployeeJobOrder>) => {
                            this.employees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.invoiceService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IInvoiceJobOrder[]>) => {
                if (!this.jobHistory.invoiceId) {
                    this.invoices = res.body;
                } else {
                    this.invoiceService.find(this.jobHistory.invoiceId).subscribe(
                        (subRes: HttpResponse<IInvoiceJobOrder>) => {
                            this.invoices = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.jobHistory.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.jobHistory.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryJobOrder>>) {
        result.subscribe((res: HttpResponse<IJobHistoryJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartmentJobOrder) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeJobOrder) {
        return item.id;
    }

    trackInvoiceById(index: number, item: IInvoiceJobOrder) {
        return item.id;
    }
}
