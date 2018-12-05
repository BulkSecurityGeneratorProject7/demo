import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';
import { JobHistoryJobOrderService } from './job-history-job-order.service';
import { JobHistoryJobOrderComponent } from './job-history-job-order.component';
import { JobHistoryJobOrderDetailComponent } from './job-history-job-order-detail.component';
import { JobHistoryJobOrderUpdateComponent } from './job-history-job-order-update.component';
import { JobHistoryJobOrderDeletePopupComponent } from './job-history-job-order-delete-dialog.component';
import { IJobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';

@Injectable({ providedIn: 'root' })
export class JobHistoryJobOrderResolve implements Resolve<IJobHistoryJobOrder> {
    constructor(private service: JobHistoryJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobHistoryJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JobHistoryJobOrder>) => response.ok),
                map((jobHistory: HttpResponse<JobHistoryJobOrder>) => jobHistory.body)
            );
        }
        return of(new JobHistoryJobOrder());
    }
}

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history-job-order',
        component: JobHistoryJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-job-order/:id/view',
        component: JobHistoryJobOrderDetailComponent,
        resolve: {
            jobHistory: JobHistoryJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-job-order/new',
        component: JobHistoryJobOrderUpdateComponent,
        resolve: {
            jobHistory: JobHistoryJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-job-order/:id/edit',
        component: JobHistoryJobOrderUpdateComponent,
        resolve: {
            jobHistory: JobHistoryJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-job-order/:id/delete',
        component: JobHistoryJobOrderDeletePopupComponent,
        resolve: {
            jobHistory: JobHistoryJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
