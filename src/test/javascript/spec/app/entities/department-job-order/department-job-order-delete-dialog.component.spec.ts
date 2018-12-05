/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestozoomTestModule } from '../../../test.module';
import { DepartmentJobOrderDeleteDialogComponent } from 'app/entities/department-job-order/department-job-order-delete-dialog.component';
import { DepartmentJobOrderService } from 'app/entities/department-job-order/department-job-order.service';

describe('Component Tests', () => {
    describe('DepartmentJobOrder Management Delete Component', () => {
        let comp: DepartmentJobOrderDeleteDialogComponent;
        let fixture: ComponentFixture<DepartmentJobOrderDeleteDialogComponent>;
        let service: DepartmentJobOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [DepartmentJobOrderDeleteDialogComponent]
            })
                .overrideTemplate(DepartmentJobOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentJobOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentJobOrderService);
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
