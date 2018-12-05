import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentJobOrder } from 'app/shared/model/department-job-order.model';
import { DepartmentJobOrderService } from './department-job-order.service';

@Component({
    selector: 'jhi-department-job-order-delete-dialog',
    templateUrl: './department-job-order-delete-dialog.component.html'
})
export class DepartmentJobOrderDeleteDialogComponent {
    department: IDepartmentJobOrder;

    constructor(
        private departmentService: DepartmentJobOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'departmentListModification',
                content: 'Deleted an department'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-job-order-delete-popup',
    template: ''
})
export class DepartmentJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ department }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DepartmentJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.department = department;
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
