import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { DepartmentJobOrderService } from './department-job-order.service';
import { DepartmentJobOrderComponent } from './department-job-order.component';
import { DepartmentJobOrderDetailComponent } from './department-job-order-detail.component';
import { DepartmentJobOrderUpdateComponent } from './department-job-order-update.component';
import { DepartmentJobOrderDeletePopupComponent } from './department-job-order-delete-dialog.component';
import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';

@Injectable({ providedIn: 'root' })
export class DepartmentJobOrderResolve implements Resolve<IDepartmentJobOrder> {
    constructor(private service: DepartmentJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DepartmentJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DepartmentJobOrder>) => response.ok),
                map((department: HttpResponse<DepartmentJobOrder>) => department.body)
            );
        }
        return of(new DepartmentJobOrder());
    }
}

export const departmentRoute: Routes = [
    {
        path: 'department-job-order',
        component: DepartmentJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-job-order/:id/view',
        component: DepartmentJobOrderDetailComponent,
        resolve: {
            department: DepartmentJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-job-order/new',
        component: DepartmentJobOrderUpdateComponent,
        resolve: {
            department: DepartmentJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-job-order/:id/edit',
        component: DepartmentJobOrderUpdateComponent,
        resolve: {
            department: DepartmentJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentPopupRoute: Routes = [
    {
        path: 'department-job-order/:id/delete',
        component: DepartmentJobOrderDeletePopupComponent,
        resolve: {
            department: DepartmentJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
