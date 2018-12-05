import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    JobJobOrderComponent,
    JobJobOrderDetailComponent,
    JobJobOrderUpdateComponent,
    JobJobOrderDeletePopupComponent,
    JobJobOrderDeleteDialogComponent,
    jobRoute,
    jobPopupRoute
} from './';

const ENTITY_STATES = [...jobRoute, ...jobPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobJobOrderComponent,
        JobJobOrderDetailComponent,
        JobJobOrderUpdateComponent,
        JobJobOrderDeleteDialogComponent,
        JobJobOrderDeletePopupComponent
    ],
    entryComponents: [JobJobOrderComponent, JobJobOrderUpdateComponent, JobJobOrderDeleteDialogComponent, JobJobOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomJobJobOrderModule {}
