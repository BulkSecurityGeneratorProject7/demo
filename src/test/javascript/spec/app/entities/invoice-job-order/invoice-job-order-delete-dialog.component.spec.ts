/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { InvoiceJobOrderDeleteDialogComponent } from 'app/entities/invoice-job-order/invoice-job-order-delete-dialog.component';
import { InvoiceJobOrderService } from 'app/entities/invoice-job-order/invoice-job-order.service';

describe('Component Tests', () => {
    describe('InvoiceJobOrder Management Delete Component', () => {
        let comp: InvoiceJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceJobOrderDeleteDialogComponent>;
        let service: InvoiceJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [InvoiceJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(InvoiceJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoiceJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceJobOrderService);
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
