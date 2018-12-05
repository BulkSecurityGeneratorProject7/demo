import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    ClientLocationJobOrderComponent,
    ClientLocationJobOrderDetailComponent,
    ClientLocationJobOrderUpdateComponent,
    ClientLocationJobOrderDeletePopupComponent,
    ClientLocationJobOrderDeleteDialogComponent,
    clientLocationRoute,
    clientLocationPopupRoute
} from './';

const ENTITY_STATES = [...clientLocationRoute, ...clientLocationPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClientLocationJobOrderComponent,
        ClientLocationJobOrderDetailComponent,
        ClientLocationJobOrderUpdateComponent,
        ClientLocationJobOrderDeleteDialogComponent,
        ClientLocationJobOrderDeletePopupComponent
    ],
    entryComponents: [
        ClientLocationJobOrderComponent,
        ClientLocationJobOrderUpdateComponent,
        ClientLocationJobOrderDeleteDialogComponent,
        ClientLocationJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomClientLocationJobOrderModule {}
