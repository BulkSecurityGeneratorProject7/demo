import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';

@Component({
    selector: 'jhi-department-job-order-detail',
    templateUrl: './department-job-order-detail.component.html'
})
export class DepartmentJobOrderDetailComponent implements OnInit {
    department: IDepartmentJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
    }

    previousState() {
        window.history.back();
    }
}
