/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { JobJobOrderDeleteDialogComponent } from 'app/entities/job-job-order/job-job-order-delete-dialog.component';
import { JobJobOrderService } from 'app/entities/job-job-order/job-job-order.service';

describe('Component Tests', () => {
    describe('JobJobOrder Management Delete Component', () => {
        let comp: JobJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<JobJobOrderDeleteDialogComponent>;
        let service: JobJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(JobJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobJobOrderService);
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
