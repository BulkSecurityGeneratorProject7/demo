/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { DepartmentJobOrderUpdateComponent } from 'app/entities/department-job-order/department-job-order-update.component';
import { DepartmentJobOrderService } from 'app/entities/department-job-order/department-job-order.service';
import { DepartmentJobOrder } from 'app/shared/model/department-job-order.model';

describe('Component Tests', () => {
    describe('DepartmentJobOrder Management Update Component', () => {
        let comp: DepartmentJobOrderUpdateComponent;
        let fixture: ComponentFixture<DepartmentJobOrderUpdateComponent>;
        let service: DepartmentJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [DepartmentJobOrderUpdateComponent]
            })
                .overrideTemplate(DepartmentJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DepartmentJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.department = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DepartmentJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.department = entity;
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
