import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';
import { ServiceRequestJobOrderService } from './service-request-job-order.service';
import { ServiceRequestJobOrderComponent } from './service-request-job-order.component';
import { ServiceRequestJobOrderDetailComponent } from './service-request-job-order-detail.component';
import { ServiceRequestJobOrderUpdateComponent } from './service-request-job-order-update.component';
import { ServiceRequestJobOrderDeletePopupComponent } from './service-request-job-order-delete-dialog.component';
import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestJobOrderResolve implements Resolve<IServiceRequestJobOrder> {
    constructor(private service: ServiceRequestJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceRequestJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ServiceRequestJobOrder>) => response.ok),
                map((serviceRequest: HttpResponse<ServiceRequestJobOrder>) => serviceRequest.body)
            );
        }
        return of(new ServiceRequestJobOrder());
    }
}

export const serviceRequestRoute: Routes = [
    {
        path: 'service-request-job-order',
        component: ServiceRequestJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-job-order/:id/view',
        component: ServiceRequestJobOrderDetailComponent,
        resolve: {
            serviceRequest: ServiceRequestJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-job-order/new',
        component: ServiceRequestJobOrderUpdateComponent,
        resolve: {
            serviceRequest: ServiceRequestJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-job-order/:id/edit',
        component: ServiceRequestJobOrderUpdateComponent,
        resolve: {
            serviceRequest: ServiceRequestJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceRequestPopupRoute: Routes = [
    {
        path: 'service-request-job-order/:id/delete',
        component: ServiceRequestJobOrderDeletePopupComponent,
        resolve: {
            serviceRequest: ServiceRequestJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
