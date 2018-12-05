import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrestozoomClientJobOrderModule } from './client-job-order/client-job-order.module';
import { PrestozoomClientLocationJobOrderModule } from './client-location-job-order/client-location-job-order.module';
import { PrestozoomServiceRequestCartJobOrderModule } from './service-request-cart-job-order/service-request-cart-job-order.module';
import { PrestozoomServiceRequestJobOrderModule } from './service-request-job-order/service-request-job-order.module';
import { PrestozoomCompanyJobOrderModule } from './company-job-order/company-job-order.module';
import { PrestozoomLocationJobOrderModule } from './location-job-order/location-job-order.module';
import { PrestozoomDepartmentJobOrderModule } from './department-job-order/department-job-order.module';
import { PrestozoomTaskJobOrderModule } from './task-job-order/task-job-order.module';
import { PrestozoomEmployeeJobOrderModule } from './employee-job-order/employee-job-order.module';
import { PrestozoomJobJobOrderModule } from './job-job-order/job-job-order.module';
import { PrestozoomJobHistoryJobOrderModule } from './job-history-job-order/job-history-job-order.module';
import { PrestozoomInvoiceJobOrderModule } from './invoice-job-order/invoice-job-order.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PrestozoomClientJobOrderModule,
        PrestozoomClientLocationJobOrderModule,
        PrestozoomServiceRequestCartJobOrderModule,
        PrestozoomServiceRequestJobOrderModule,
        PrestozoomCompanyJobOrderModule,
        PrestozoomLocationJobOrderModule,
        PrestozoomDepartmentJobOrderModule,
        PrestozoomTaskJobOrderModule,
        PrestozoomEmployeeJobOrderModule,
        PrestozoomJobJobOrderModule,
        PrestozoomJobHistoryJobOrderModule,
        PrestozoomInvoiceJobOrderModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestozoomEntityModule {}
