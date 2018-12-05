import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';
import { ServiceRequestCartJobOrderService } from './service-request-cart-job-order.service';
import { ServiceRequestCartJobOrderComponent } from './service-request-cart-job-order.component';
import { ServiceRequestCartJobOrderDetailComponent } from './service-request-cart-job-order-detail.component';
import { ServiceRequestCartJobOrderUpdateComponent } from './service-request-cart-job-order-update.component';
import { ServiceRequestCartJobOrderDeletePopupComponent } from './service-request-cart-job-order-delete-dialog.component';
import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestCartJobOrderResolve implements Resolve<IServiceRequestCartJobOrder> {
    constructor(private service: ServiceRequestCartJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceRequestCartJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ServiceRequestCartJobOrder>) => response.ok),
                map((serviceRequestCart: HttpResponse<ServiceRequestCartJobOrder>) => serviceRequestCart.body)
            );
        }
        return of(new ServiceRequestCartJobOrder());
    }
}

export const serviceRequestCartRoute: Routes = [
    {
        path: 'service-request-cart-job-order',
        component: ServiceRequestCartJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequestCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-cart-job-order/:id/view',
        component: ServiceRequestCartJobOrderDetailComponent,
        resolve: {
            serviceRequestCart: ServiceRequestCartJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequestCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-cart-job-order/new',
        component: ServiceRequestCartJobOrderUpdateComponent,
        resolve: {
            serviceRequestCart: ServiceRequestCartJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequestCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-request-cart-job-order/:id/edit',
        component: ServiceRequestCartJobOrderUpdateComponent,
        resolve: {
            serviceRequestCart: ServiceRequestCartJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequestCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceRequestCartPopupRoute: Routes = [
    {
        path: 'service-request-cart-job-order/:id/delete',
        component: ServiceRequestCartJobOrderDeletePopupComponent,
        resolve: {
            serviceRequestCart: ServiceRequestCartJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.serviceRequestCart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
