import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobJobOrder } from 'app/shared/model/job-job-order.model';
import { JobJobOrderService } from './job-job-order.service';
import { JobJobOrderComponent } from './job-job-order.component';
import { JobJobOrderDetailComponent } from './job-job-order-detail.component';
import { JobJobOrderUpdateComponent } from './job-job-order-update.component';
import { JobJobOrderDeletePopupComponent } from './job-job-order-delete-dialog.component';
import { IJobJobOrder } from 'app/shared/model/job-job-order.model';

@Injectable({ providedIn: 'root' })
export class JobJobOrderResolve implements Resolve<IJobJobOrder> {
    constructor(private service: JobJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JobJobOrder>) => response.ok),
                map((job: HttpResponse<JobJobOrder>) => job.body)
            );
        }
        return of(new JobJobOrder());
    }
}

export const jobRoute: Routes = [
    {
        path: 'job-job-order',
        component: JobJobOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestozoomApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-job-order/:id/view',
        component: JobJobOrderDetailComponent,
        resolve: {
            job: JobJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-job-order/new',
        component: JobJobOrderUpdateComponent,
        resolve: {
            job: JobJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-job-order/:id/edit',
        component: JobJobOrderUpdateComponent,
        resolve: {
            job: JobJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobPopupRoute: Routes = [
    {
        path: 'job-job-order/:id/delete',
        component: JobJobOrderDeletePopupComponent,
        resolve: {
            job: JobJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
