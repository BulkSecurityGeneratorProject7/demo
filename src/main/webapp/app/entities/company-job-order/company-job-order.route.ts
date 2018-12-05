import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyJobOrder } from 'app/shared/model/company-job-order.model';
import { CompanyJobOrderService } from './company-job-order.service';
import { CompanyJobOrderComponent } from './company-job-order.component';
import { CompanyJobOrderDetailComponent } from './company-job-order-detail.component';
import { CompanyJobOrderUpdateComponent } from './company-job-order-update.component';
import { CompanyJobOrderDeletePopupComponent } from './company-job-order-delete-dialog.component';
import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';

@Injectable({ providedIn: 'root' })
export class CompanyJobOrderResolve implements Resolve<ICompanyJobOrder> {
    constructor(private service: CompanyJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyJobOrder>) => response.ok),
                map((company: HttpResponse<CompanyJobOrder>) => company.body)
            );
        }
        return of(new CompanyJobOrder());
    }
}

export const companyRoute: Routes = [
    {
        path: 'company-job-order',
        component: CompanyJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-job-order/:id/view',
        component: CompanyJobOrderDetailComponent,
        resolve: {
            company: CompanyJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-job-order/new',
        component: CompanyJobOrderUpdateComponent,
        resolve: {
            company: CompanyJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-job-order/:id/edit',
        component: CompanyJobOrderUpdateComponent,
        resolve: {
            company: CompanyJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPopupRoute: Routes = [
    {
        path: 'company-job-order/:id/delete',
        component: CompanyJobOrderDeletePopupComponent,
        resolve: {
            company: CompanyJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
