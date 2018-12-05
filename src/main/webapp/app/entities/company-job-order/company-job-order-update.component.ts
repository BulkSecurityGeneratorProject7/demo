import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';
import { CompanyJobOrderService } from './company-job-order.service';

@Component({
    selector: 'jhi-company-job-order-update',
    templateUrl: './company-job-order-update.component.html'
})
export class CompanyJobOrderUpdateComponent implements OnInit {
    company: ICompanyJobOrder;
    isSaving: boolean;

    constructor(private companyService: CompanyJobOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyJobOrder>>) {
        result.subscribe((res: HttpResponse<ICompanyJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
