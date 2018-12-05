import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';
import { ClientLocationJobOrderService } from './client-location-job-order.service';
import { ClientLocationJobOrderComponent } from './client-location-job-order.component';
import { ClientLocationJobOrderDetailComponent } from './client-location-job-order-detail.component';
import { ClientLocationJobOrderUpdateComponent } from './client-location-job-order-update.component';
import { ClientLocationJobOrderDeletePopupComponent } from './client-location-job-order-delete-dialog.component';
import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

@Injectable({ providedIn: 'root' })
export class ClientLocationJobOrderResolve implements Resolve<IClientLocationJobOrder> {
    constructor(private service: ClientLocationJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClientLocationJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ClientLocationJobOrder>) => response.ok),
                map((clientLocation: HttpResponse<ClientLocationJobOrder>) => clientLocation.body)
            );
        }
        return of(new ClientLocationJobOrder());
    }
}

export const clientLocationRoute: Routes = [
    {
        path: 'client-location-job-order',
        component: ClientLocationJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.clientLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-location-job-order/:id/view',
        component: ClientLocationJobOrderDetailComponent,
        resolve: {
            clientLocation: ClientLocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.clientLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-location-job-order/new',
        component: ClientLocationJobOrderUpdateComponent,
        resolve: {
            clientLocation: ClientLocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.clientLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-location-job-order/:id/edit',
        component: ClientLocationJobOrderUpdateComponent,
        resolve: {
            clientLocation: ClientLocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.clientLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientLocationPopupRoute: Routes = [
    {
        path: 'client-location-job-order/:id/delete',
        component: ClientLocationJobOrderDeletePopupComponent,
        resolve: {
            clientLocation: ClientLocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.clientLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
