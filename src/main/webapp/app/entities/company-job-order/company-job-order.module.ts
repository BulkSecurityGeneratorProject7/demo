import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestozoomSharedModule } from 'app/shared';
import {
    CompanyJobOrderComponent,
    CompanyJobOrderDetailComponent,
    CompanyJobOrderUpdateComponent,
    CompanyJobOrderDeletePopupComponent,
    CompanyJobOrderDeleteDialogComponent,
    companyRoute,
    companyPopupRoute
} from './';

const ENTITY_STATES = [...companyRoute, ...companyPopupRoute];

@NgModule({
    imports: [PrestozoomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyJobOrderComponent,
        CompanyJobOrderDetailComponent,
        CompanyJobOrderUpdateComponent,
        CompanyJobOrderDeleteDialogComponent,
        CompanyJobOrderDeletePopupComponent
    ],
    entryComponents: [
        CompanyJobOrderComponent,
        CompanyJobOrderUpdateComponent,
        CompanyJobOrderDeleteDialogComponent,
        CompanyJobOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomCompanyJobOrderModule {}
