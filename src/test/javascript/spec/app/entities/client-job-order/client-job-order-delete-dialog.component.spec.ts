/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientJobOrderDeleteDialogComponent } from 'app/entities/client-job-order/client-job-order-delete-dialog.component';
import { ClientJobOrderService } from 'app/entities/client-job-order/client-job-order.service';

describe('Component Tests', () => {
    describe('ClientJobOrder Management Delete Component', () => {
        let comp: ClientJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<ClientJobOrderDeleteDialogComponent>;
        let service: ClientJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(ClientJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientJobOrderService);
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
