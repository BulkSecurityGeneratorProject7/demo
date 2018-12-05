/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { TaskJobOrderDeleteDialogComponent } from 'app/entities/task-job-order/task-job-order-delete-dialog.component';
import { TaskJobOrderService } from 'app/entities/task-job-order/task-job-order.service';

describe('Component Tests', () => {
    describe('TaskJobOrder Management Delete Component', () => {
        let comp: TaskJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<TaskJobOrderDeleteDialogComponent>;
        let service: TaskJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [TaskJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(TaskJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskJobOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
