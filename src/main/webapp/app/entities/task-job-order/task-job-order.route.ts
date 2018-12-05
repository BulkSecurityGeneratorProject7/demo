import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TaskJobOrder } from 'app/shared/model/task-job-order.model';
import { TaskJobOrderService } from './task-job-order.service';
import { TaskJobOrderComponent } from './task-job-order.component';
import { TaskJobOrderDetailComponent } from './task-job-order-detail.component';
import { TaskJobOrderUpdateComponent } from './task-job-order-update.component';
import { TaskJobOrderDeletePopupComponent } from './task-job-order-delete-dialog.component';
import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';

@Injectable({ providedIn: 'root' })
export class TaskJobOrderResolve implements Resolve<ITaskJobOrder> {
    constructor(private service: TaskJobOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskJobOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TaskJobOrder>) => response.ok),
                map((task: HttpResponse<TaskJobOrder>) => task.body)
            );
        }
        return of(new TaskJobOrder());
    }
}

export const taskRoute: Routes = [
    {
        path: 'task-job-order',
        component: TaskJobOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-job-order/:id/view',
        component: TaskJobOrderDetailComponent,
        resolve: {
            task: TaskJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-job-order/new',
        component: TaskJobOrderUpdateComponent,
        resolve: {
            task: TaskJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-job-order/:id/edit',
        component: TaskJobOrderUpdateComponent,
        resolve: {
            task: TaskJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task-job-order/:id/delete',
        component: TaskJobOrderDeletePopupComponent,
        resolve: {
            task: TaskJobOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestozoomApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
