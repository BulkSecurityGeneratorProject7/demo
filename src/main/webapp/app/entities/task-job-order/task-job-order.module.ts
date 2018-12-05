import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    TaskJobOrderComponent,
    TaskJobOrderDetailComponent,
    TaskJobOrderUpdateComponent,
    TaskJobOrderDeletePopupComponent,
    TaskJobOrderDeleteDialogComponent,
    taskRoute,
    taskPopupRoute
} from './';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskJobOrderComponent,
        TaskJobOrderDetailComponent,
        TaskJobOrderUpdateComponent,
        TaskJobOrderDeleteDialogComponent,
        TaskJobOrderDeletePopupComponent
    ],
    entryComponents: [
        TaskJobOrderComponent,
        TaskJobOrderUpdateComponent,
        TaskJobOrderDeleteDialogComponent,
        TaskJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomTaskJobOrderModule {}
