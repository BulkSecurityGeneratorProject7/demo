import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    EmployeeJobOrderComponent,
    EmployeeJobOrderDetailComponent,
    EmployeeJobOrderUpdateComponent,
    EmployeeJobOrderDeletePopupComponent,
    EmployeeJobOrderDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute
} from './';

const ENTITY_STATES = [...employeeRoute, ...employeePopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeeJobOrderComponent,
        EmployeeJobOrderDetailComponent,
        EmployeeJobOrderUpdateComponent,
        EmployeeJobOrderDeleteDialogComponent,
        EmployeeJobOrderDeletePopupComponent
    ],
    entryComponents: [
        EmployeeJobOrderComponent,
        EmployeeJobOrderUpdateComponent,
        EmployeeJobOrderDeleteDialogComponent,
        EmployeeJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomEmployeeJobOrderModule {}
