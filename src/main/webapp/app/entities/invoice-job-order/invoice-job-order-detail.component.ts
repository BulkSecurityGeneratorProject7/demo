import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

@Component({
    selector: 'jhi-invoice-job-order-detail',
    templateUrl: './invoice-job-order-detail.component.html'
})
export class InvoiceJobOrderDetailComponent implements OnInit {
    invoice: IInvoiceJobOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
        });
    }

    previousState() {
        window.history.back();
    }
}
