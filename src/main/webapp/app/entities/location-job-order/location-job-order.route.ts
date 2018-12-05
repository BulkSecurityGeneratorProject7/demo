import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LocationJobOrder } from 'app/shared/model/location-job-order.model';
import { LocationJobOrderService } from './location-job-order.service';
import { LocationJobOrderComponent } from './location-job-order.component';
import { LocationJobOrderDetailComponent } from './location-job-order-detail.component';
import { LocationJobOrderUpdateComponent } from './location-job-order-update.component';
import { LocationJobOrderDeletePopupComponent } from './location-job-order-delete-dialog.component';
import { ILocationJobOrder } from 'app/shared/model/location-job-order.model';

@Injectable({ providedIn: 'root' })
export class LocationJobOrderResolve implements Resolve<ILocationJobOrder> {
    constructor(private service: LocationJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LocationJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LocationJobOrder>) => response.ok),
                map((location: HttpResponse<LocationJobOrder>) => location.body)
            );
        }
        return of(new LocationJobOrder());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-job-order',
        component: LocationJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-job-order/:id/view',
        component: LocationJobOrderDetailComponent,
        resolve: {
            location: LocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-job-order/new',
        component: LocationJobOrderUpdateComponent,
        resolve: {
            location: LocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-job-order/:id/edit',
        component: LocationJobOrderUpdateComponent,
        resolve: {
            location: LocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-job-order/:id/delete',
        component: LocationJobOrderDeletePopupComponent,
        resolve: {
            location: LocationJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
