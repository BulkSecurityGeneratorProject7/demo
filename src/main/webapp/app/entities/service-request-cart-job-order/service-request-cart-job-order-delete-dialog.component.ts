import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';
import { ServiceRequestCartJobOrderService } from './service-request-cart-job-order.service';

@Component({
    selector: 'jhi-service-request-cart-job-order-delete-dialog',
    templateUrl: './service-request-cart-job-order-delete-dialog.component.html'
})
export class ServiceRequestCartJobOrderDeleteDialogComponent {
    serviceRequestCart: IServiceRequestCartJobOrder;

    constructor(
        private serviceRequestCartService: ServiceRequestCartJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceRequestCartService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'serviceRequestCartListModification',
                content: 'Deleted an serviceRequestCart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-request-cart-job-order-delete-popup',
    template: ''
})
export class ServiceRequestCartJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceRequestCart }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServiceRequestCartJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.serviceRequestCart = serviceRequestCart;
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
