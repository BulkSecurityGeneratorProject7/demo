import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    JobHistoryJobOrderComponent,
    JobHistoryJobOrderDetailComponent,
    JobHistoryJobOrderUpdateComponent,
    JobHistoryJobOrderDeletePopupComponent,
    JobHistoryJobOrderDeleteDialogComponent,
    jobHistoryRoute,
    jobHistoryPopupRoute
} from './';

const ENTITY_STATES = [...jobHistoryRoute, ...jobHistoryPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobHistoryJobOrderComponent,
        JobHistoryJobOrderDetailComponent,
        JobHistoryJobOrderUpdateComponent,
        JobHistoryJobOrderDeleteDialogComponent,
        JobHistoryJobOrderDeletePopupComponent
    ],
    entryComponents: [
        JobHistoryJobOrderComponent,
        JobHistoryJobOrderUpdateComponent,
        JobHistoryJobOrderDeleteDialogComponent,
        JobHistoryJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomJobHistoryJobOrderModule {}
