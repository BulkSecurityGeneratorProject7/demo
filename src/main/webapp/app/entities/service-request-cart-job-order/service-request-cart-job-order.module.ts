import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    ServiceRequestCartJobOrderComponent,
    ServiceRequestCartJobOrderDetailComponent,
    ServiceRequestCartJobOrderUpdateComponent,
    ServiceRequestCartJobOrderDeletePopupComponent,
    ServiceRequestCartJobOrderDeleteDialogComponent,
    serviceRequestCartRoute,
    serviceRequestCartPopupRoute
} from './';

const ENTITY_STATES = [...serviceRequestCartRoute, ...serviceRequestCartPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServiceRequestCartJobOrderComponent,
        ServiceRequestCartJobOrderDetailComponent,
        ServiceRequestCartJobOrderUpdateComponent,
        ServiceRequestCartJobOrderDeleteDialogComponent,
        ServiceRequestCartJobOrderDeletePopupComponent
    ],
    entryComponents: [
        ServiceRequestCartJobOrderComponent,
        ServiceRequestCartJobOrderUpdateComponent,
        ServiceRequestCartJobOrderDeleteDialogComponent,
        ServiceRequestCartJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomServiceRequestCartJobOrderModule {}
