import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';
import { InvoiceJobOrderService } from './invoice-job-order.service';

@Component({
    selector: 'jhi-invoice-job-order-delete-dialog',
    templateUrl: './invoice-job-order-delete-dialog.component.html'
})
export class InvoiceJobOrderDeleteDialogComponent {
    invoice: IInvoiceJobOrder;

    constructor(
        private invoiceService: InvoiceJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-job-order-delete-popup',
    template: ''
})
export class InvoiceJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvoiceJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.invoice = invoice;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
