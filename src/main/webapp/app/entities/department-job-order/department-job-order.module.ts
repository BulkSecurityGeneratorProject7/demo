import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    DepartmentJobOrderComponent,
    DepartmentJobOrderDetailComponent,
    DepartmentJobOrderUpdateComponent,
    DepartmentJobOrderDeletePopupComponent,
    DepartmentJobOrderDeleteDialogComponent,
    departmentRoute,
    departmentPopupRoute
} from './';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartmentJobOrderComponent,
        DepartmentJobOrderDetailComponent,
        DepartmentJobOrderUpdateComponent,
        DepartmentJobOrderDeleteDialogComponent,
        DepartmentJobOrderDeletePopupComponent
    ],
    entryComponents: [
        DepartmentJobOrderComponent,
        DepartmentJobOrderUpdateComponent,
        DepartmentJobOrderDeleteDialogComponent,
        DepartmentJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomDepartmentJobOrderModule {}
