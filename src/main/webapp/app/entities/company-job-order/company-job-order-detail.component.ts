import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';

@Component({
    selector: 'jhi-company-job-order-detail',
    templateUrl: './company-job-order-detail.component.html'
})
export class CompanyJobOrderDetailComponent implements OnInit {
    company: ICompanyJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }
}
