/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientLocationJobOrderDeleteDialogComponent } from 'app/entities/client-location-job-order/client-location-job-order-delete-dialog.component';
import { ClientLocationJobOrderService } from 'app/entities/client-location-job-order/client-location-job-order.service';

describe('Component Tests', () => {
    describe('ClientLocationJobOrder Management Delete Component', () => {
        let comp: ClientLocationJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<ClientLocationJobOrderDeleteDialogComponent>;
        let service: ClientLocationJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientLocationJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(ClientLocationJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientLocationJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientLocationJobOrderService);
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
