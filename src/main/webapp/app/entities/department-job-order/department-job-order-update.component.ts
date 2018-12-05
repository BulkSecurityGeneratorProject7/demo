import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { DepartmentJobOrderService } from './department-job-order.service';
import { ILocationJobOrder } from 'app/shared/model/location-job-order.model';
import { LocationJobOrderService } from 'app/entities/location-job-order';

@Component({
    selector: 'jhi-department-job-order-update',
    templateUrl: './department-job-order-update.component.html'
})
export class DepartmentJobOrderUpdateComponent implements OnInit {
    department: IDepartmentJobOrder;
    isSaving: boolean;

    locations: ILocationJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private departmentService: DepartmentJobOrderService,
        private locationService: LocationJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocationJobOrder[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(this.departmentService.create(this.department));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentJobOrder>>) {
        result.subscribe((res: HttpResponse<IDepartmentJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocationJobOrder) {
        return item.id;
    }
}
