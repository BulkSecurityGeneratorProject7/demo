import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';
import { JobHistoryJobOrderService } from './job-history-job-order.service';

@Component({
    selector: 'jhi-job-history-job-order-delete-dialog',
    templateUrl: './job-history-job-order-delete-dialog.component.html'
})
export class JobHistoryJobOrderDeleteDialogComponent {
    jobHistory: IJobHistoryJobOrder;

    constructor(
        private jobHistoryService: JobHistoryJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobHistoryListModification',
                content: 'Deleted an jobHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-history-job-order-delete-popup',
    template: ''
})
export class JobHistoryJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobHistoryJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jobHistory = jobHistory;
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
