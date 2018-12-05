/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { EmployeeJobOrderUpdateComponent } from 'app/entities/employee-job-order/employee-job-order-update.component';
import { EmployeeJobOrderService } from 'app/entities/employee-job-order/employee-job-order.service';
import { EmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

describe('Component Tests', () => {
    describe('EmployeeJobOrder Management Update Component', () => {
        let comp: EmployeeJobOrderUpdateComponent;
        let fixture: ComponentFixture<EmployeeJobOrderUpdateComponent>;
        let service: EmployeeJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [EmployeeJobOrderUpdateComponent]
            })
                .overrideTemplate(EmployeeJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmployeeJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new EmployeeJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.employee = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new EmployeeJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.employee = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
