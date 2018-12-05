import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

@Component({
    selector: 'jhi-employee-job-order-detail',
    templateUrl: './employee-job-order-detail.component.html'
})
export class EmployeeJobOrderDetailComponent implements OnInit {
    employee: IEmployeeJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
        });
    }

    previousState() {
        window.history.back();
    }
}
