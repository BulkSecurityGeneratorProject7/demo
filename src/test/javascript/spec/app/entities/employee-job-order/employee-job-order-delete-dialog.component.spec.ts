/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { EmployeeJobOrderDeleteDialogComponent } from 'app/entities/employee-job-order/employee-job-order-delete-dialog.component';
import { EmployeeJobOrderService } from 'app/entities/employee-job-order/employee-job-order.service';

describe('Component Tests', () => {
    describe('EmployeeJobOrder Management Delete Component', () => {
        let comp: EmployeeJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeeJobOrderDeleteDialogComponent>;
        let service: EmployeeJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [EmployeeJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(EmployeeJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeJobOrderService);
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
