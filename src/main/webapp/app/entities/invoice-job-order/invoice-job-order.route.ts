import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';
import { InvoiceJobOrderService } from './invoice-job-order.service';
import { InvoiceJobOrderComponent } from './invoice-job-order.component';
import { InvoiceJobOrderDetailComponent } from './invoice-job-order-detail.component';
import { InvoiceJobOrderUpdateComponent } from './invoice-job-order-update.component';
import { InvoiceJobOrderDeletePopupComponent } from './invoice-job-order-delete-dialog.component';
import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

@Injectable({ providedIn: 'root' })
export class InvoiceJobOrderResolve implements Resolve<IInvoiceJobOrder> {
    constructor(private service: InvoiceJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<InvoiceJobOrder>) => response.ok),
                map((invoice: HttpResponse<InvoiceJobOrder>) => invoice.body)
            );
        }
        return of(new InvoiceJobOrder());
    }
}

export const invoiceRoute: Routes = [
    {
        path: 'invoice-job-order',
        component: InvoiceJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-job-order/:id/view',
        component: InvoiceJobOrderDetailComponent,
        resolve: {
            invoice: InvoiceJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-job-order/new',
        component: InvoiceJobOrderUpdateComponent,
        resolve: {
            invoice: InvoiceJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-job-order/:id/edit',
        component: InvoiceJobOrderUpdateComponent,
        resolve: {
            invoice: InvoiceJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePopupRoute: Routes = [
    {
        path: 'invoice-job-order/:id/delete',
        component: InvoiceJobOrderDeletePopupComponent,
        resolve: {
            invoice: InvoiceJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
