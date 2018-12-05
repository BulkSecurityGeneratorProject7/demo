import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocationJobOrder } from 'app/shared/model/location-job-order.model';
import { LocationJobOrderService } from './location-job-order.service';
import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';
import { CompanyJobOrderService } from 'app/entities/company-job-order';

@Component({
    selector: 'jhi-location-job-order-update',
    templateUrl: './location-job-order-update.component.html'
})
export class LocationJobOrderUpdateComponent implements OnInit {
    location: ILocationJobOrder;
    isSaving: boolean;

    companies: ICompanyJobOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private locationService: LocationJobOrderService,
        private companyService: CompanyJobOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompanyJobOrder[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationJobOrder>>) {
        result.subscribe((res: HttpResponse<ILocationJobOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyById(index: number, item: ICompanyJobOrder) {
        return item.id;
    }
}
