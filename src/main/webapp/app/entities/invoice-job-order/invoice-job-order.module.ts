import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    InvoiceJobOrderComponent,
    InvoiceJobOrderDetailComponent,
    InvoiceJobOrderUpdateComponent,
    InvoiceJobOrderDeletePopupComponent,
    InvoiceJobOrderDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute
} from './';

const ENTITY_STATES = [...invoiceRoute, ...invoicePopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InvoiceJobOrderComponent,
        InvoiceJobOrderDetailComponent,
        InvoiceJobOrderUpdateComponent,
        InvoiceJobOrderDeleteDialogComponent,
        InvoiceJobOrderDeletePopupComponent
    ],
    entryComponents: [
        InvoiceJobOrderComponent,
        InvoiceJobOrderUpdateComponent,
        InvoiceJobOrderDeleteDialogComponent,
        InvoiceJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomInvoiceJobOrderModule {}
