import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClientJobOrder } from 'app/shared/model/client-job-order.model';
import { ClientJobOrderService } from './client-job-order.service';
import { ClientJobOrderComponent } from './client-job-order.component';
import { ClientJobOrderDetailComponent } from './client-job-order-detail.component';
import { ClientJobOrderUpdateComponent } from './client-job-order-update.component';
import { ClientJobOrderDeletePopupComponent } from './client-job-order-delete-dialog.component';
import { IClientJobOrder } from 'app/shared/model/client-job-order.model';

@Injectable({ providedIn: 'root' })
export class ClientJobOrderResolve implements Resolve<IClientJobOrder> {
    constructor(private service: ClientJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClientJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ClientJobOrder>) => response.ok),
                map((client: HttpResponse<ClientJobOrder>) => client.body)
            );
        }
        return of(new ClientJobOrder());
    }
}

export const clientRoute: Routes = [
    {
        path: 'client-job-order',
        component: ClientJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-job-order/:id/view',
        component: ClientJobOrderDetailComponent,
        resolve: {
            client: ClientJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-job-order/new',
        component: ClientJobOrderUpdateComponent,
        resolve: {
            client: ClientJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'client-job-order/:id/edit',
        component: ClientJobOrderUpdateComponent,
        resolve: {
            client: ClientJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientPopupRoute: Routes = [
    {
        path: 'client-job-order/:id/delete',
        component: ClientJobOrderDeletePopupComponent,
        resolve: {
            client: ClientJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
