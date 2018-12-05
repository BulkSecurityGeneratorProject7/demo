import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    ServiceRequestJobOrderComponent,
    ServiceRequestJobOrderDetailComponent,
    ServiceRequestJobOrderUpdateComponent,
    ServiceRequestJobOrderDeletePopupComponent,
    ServiceRequestJobOrderDeleteDialogComponent,
    serviceRequestRoute,
    serviceRequestPopupRoute
} from './';

const ENTITY_STATES = [...serviceRequestRoute, ...serviceRequestPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServiceRequestJobOrderComponent,
        ServiceRequestJobOrderDetailComponent,
        ServiceRequestJobOrderUpdateComponent,
        ServiceRequestJobOrderDeleteDialogComponent,
        ServiceRequestJobOrderDeletePopupComponent
    ],
    entryComponents: [
        ServiceRequestJobOrderComponent,
        ServiceRequestJobOrderUpdateComponent,
        ServiceRequestJobOrderDeleteDialogComponent,
        ServiceRequestJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomServiceRequestJobOrderModule {}
