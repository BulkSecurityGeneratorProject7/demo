import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeJobOrder } from 'app/shared/model/employee-job-order.model';
import { EmployeeJobOrderService } from './employee-job-order.service';
import { EmployeeJobOrderComponent } from './employee-job-order.component';
import { EmployeeJobOrderDetailComponent } from './employee-job-order-detail.component';
import { EmployeeJobOrderUpdateComponent } from './employee-job-order-update.component';
import { EmployeeJobOrderDeletePopupComponent } from './employee-job-order-delete-dialog.component';
import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

@Injectable({ providedIn: 'root' })
export class EmployeeJobOrderResolve implements Resolve<IEmployeeJobOrder> {
    constructor(private service: EmployeeJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EmployeeJobOrder>) => response.ok),
                map((employee: HttpResponse<EmployeeJobOrder>) => employee.body)
            );
        }
        return of(new EmployeeJobOrder());
    }
}

export const employeeRoute: Routes = [
    {
        path: 'employee-job-order',
        component: EmployeeJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-job-order/:id/view',
        component: EmployeeJobOrderDetailComponent,
        resolve: {
            employee: EmployeeJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-job-order/new',
        component: EmployeeJobOrderUpdateComponent,
        resolve: {
            employee: EmployeeJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-job-order/:id/edit',
        component: EmployeeJobOrderUpdateComponent,
        resolve: {
            employee: EmployeeJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeePopupRoute: Routes = [
    {
        path: 'employee-job-order/:id/delete',
        component: EmployeeJobOrderDeletePopupComponent,
        resolve: {
            employee: EmployeeJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
