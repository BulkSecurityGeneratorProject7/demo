import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';
import { ClientLocationJobOrderService } from './client-location-job-order.service';

@Component({
    selector: 'jhi-client-location-job-order-delete-dialog',
    templateUrl: './client-location-job-order-delete-dialog.component.html'
})
export class ClientLocationJobOrderDeleteDialogComponent {
    clientLocation: IClientLocationJobOrder;

    constructor(
        private clientLocationService: ClientLocationJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientLocationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'clientLocationListModification',
                content: 'Deleted an clientLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-location-job-order-delete-popup',
    template: ''
})
export class ClientLocationJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clientLocation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClientLocationJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.clientLocation = clientLocation;
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
