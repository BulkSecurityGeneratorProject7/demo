import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    LocationJobOrderComponent,
    LocationJobOrderDetailComponent,
    LocationJobOrderUpdateComponent,
    LocationJobOrderDeletePopupComponent,
    LocationJobOrderDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationJobOrderComponent,
        LocationJobOrderDetailComponent,
        LocationJobOrderUpdateComponent,
        LocationJobOrderDeleteDialogComponent,
        LocationJobOrderDeletePopupComponent
    ],
    entryComponents: [
        LocationJobOrderComponent,
        LocationJobOrderUpdateComponent,
        LocationJobOrderDeleteDialogComponent,
        LocationJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomLocationJobOrderModule {}
