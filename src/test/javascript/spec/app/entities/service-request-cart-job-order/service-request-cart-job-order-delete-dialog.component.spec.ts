/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestCartJobOrderDeleteDialogComponent } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order-delete-dialog.component';
import { ServiceRequestCartJobOrderService } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order.service';

describe('Component Tests', () => {
    describe('ServiceRequestCartJobOrder Management Delete Component', () => {
        let comp: ServiceRequestCartJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceRequestCartJobOrderDeleteDialogComponent>;
        let service: ServiceRequestCartJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestCartJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(ServiceRequestCartJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServiceRequestCartJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestCartJobOrderService);
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
