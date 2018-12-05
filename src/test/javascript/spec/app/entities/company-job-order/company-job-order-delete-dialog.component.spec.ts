/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { CompanyJobOrderDeleteDialogComponent } from 'app/entities/company-job-order/company-job-order-delete-dialog.component';
import { CompanyJobOrderService } from 'app/entities/company-job-order/company-job-order.service';

describe('Component Tests', () => {
    describe('CompanyJobOrder Management Delete Component', () => {
        let comp: CompanyJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyJobOrderDeleteDialogComponent>;
        let service: CompanyJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [CompanyJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(CompanyJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyJobOrderService);
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
