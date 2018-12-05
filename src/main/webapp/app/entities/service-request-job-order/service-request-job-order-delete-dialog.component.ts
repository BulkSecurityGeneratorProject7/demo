import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';
import { ServiceRequestJobOrderService } from './service-request-job-order.service';

@Component({
    selector: 'jhi-service-request-job-order-delete-dialog',
    templateUrl: './service-request-job-order-delete-dialog.component.html'
})
export class ServiceRequestJobOrderDeleteDialogComponent {
    serviceRequest: IServiceRequestJobOrder;

    constructor(
        private serviceRequestService: ServiceRequestJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'serviceRequestListModification',
                content: 'Deleted an serviceRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-request-job-order-delete-popup',
    template: ''
})
export class ServiceRequestJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ serviceRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServiceRequestJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.serviceRequest = serviceRequest;
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
