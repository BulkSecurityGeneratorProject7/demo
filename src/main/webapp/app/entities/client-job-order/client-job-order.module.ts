import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    ClientJobOrderComponent,
    ClientJobOrderDetailComponent,
    ClientJobOrderUpdateComponent,
    ClientJobOrderDeletePopupComponent,
    ClientJobOrderDeleteDialogComponent,
    clientRoute,
    clientPopupRoute
} from './';

const ENTITY_STATES = [...clientRoute, ...clientPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClientJobOrderComponent,
        ClientJobOrderDetailComponent,
        ClientJobOrderUpdateComponent,
        ClientJobOrderDeleteDialogComponent,
        ClientJobOrderDeletePopupComponent
    ],
    entryComponents: [
        ClientJobOrderComponent,
        ClientJobOrderUpdateComponent,
        ClientJobOrderDeleteDialogComponent,
        ClientJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomClientJobOrderModule {}
