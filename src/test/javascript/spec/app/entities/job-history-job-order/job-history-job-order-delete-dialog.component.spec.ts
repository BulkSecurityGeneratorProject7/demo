/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { JobHistoryJobOrderDeleteDialogComponent } from 'app/entities/job-history-job-order/job-history-job-order-delete-dialog.component';
import { JobHistoryJobOrderService } from 'app/entities/job-history-job-order/job-history-job-order.service';

describe('Component Tests', () => {
    describe('JobHistoryJobOrder Management Delete Component', () => {
        let comp: JobHistoryJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<JobHistoryJobOrderDeleteDialogComponent>;
        let service: JobHistoryJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobHistoryJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(JobHistoryJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryJobOrderService);
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
