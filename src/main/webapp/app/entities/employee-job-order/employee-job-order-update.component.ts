import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';
import { EmployeeJobOrderService } from './employee-job-order.service';
import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { DepartmentJobOrderService } from 'app/entities/department-job-order';

@Component({
    selector: 'jhi-employee-job-order-update',
    templateUrl: './employee-job-order-update.component.html'
})
export class EmployeeJobOrderUpdateComponent implements OnInit {
    employee: IEmployeeJobOrder;
    isSaving: boolean;

    departments: IDepartmentJobOrder[];

    employees: IEmployeeJobOrder[];
    hireDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private employeeService: EmployeeJobOrderService,
        private departmentService: DepartmentJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
            this.hireDate = this.employee.hireDate != null ? this.employee.hireDate.format(DATE_TIME_FORMAT) : null;
        });
        this.departmentService.query().subscribe(
            (res: HttpResponse<IDepartmentJobOrder[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeJobOrder[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.employee.hireDate = this.hireDate != null ? moment(this.hireDate, DATE_TIME_FORMAT) : null;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeJobOrder>>) {
        result.subscribe((res: HttpResponse<IEmployeeJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartmentJobOrder) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeJobOrder) {
        return item.id;
    }
}
