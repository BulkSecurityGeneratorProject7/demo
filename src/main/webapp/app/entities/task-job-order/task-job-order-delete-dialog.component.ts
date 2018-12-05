import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';
import { TaskJobOrderService } from './task-job-order.service';

@Component({
    selector: 'jhi-task-job-order-delete-dialog',
    templateUrl: './task-job-order-delete-dialog.component.html'
})
export class TaskJobOrderDeleteDialogComponent {
    task: ITaskJobOrder;

    constructor(private taskService: TaskJobOrderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taskListModification',
                content: 'Deleted an task'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-task-job-order-delete-popup',
    template: ''
})
export class TaskJobOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ task }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaskJobOrderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.task = task;
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
