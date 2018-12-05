/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestJobOrderDeleteDialogComponent } from 'app/entities/service-request-job-order/service-request-job-order-delete-dialog.component';
import { ServiceRequestJobOrderService } from 'app/entities/service-request-job-order/service-request-job-order.service';

describe('Component Tests', () => {
    describe('ServiceRequestJobOrder Management Delete Component', () => {
        let comp: ServiceRequestJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceRequestJobOrderDeleteDialogComponent>;
        let service: ServiceRequestJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(ServiceRequestJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServiceRequestJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestJobOrderService);
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
