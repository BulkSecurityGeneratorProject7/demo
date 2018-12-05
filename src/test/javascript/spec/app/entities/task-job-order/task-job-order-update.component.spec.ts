/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { TaskJobOrderUpdateComponent } from 'app/entities/task-job-order/task-job-order-update.component';
import { TaskJobOrderService } from 'app/entities/task-job-order/task-job-order.service';
import { TaskJobOrder } from 'app/shared/model/task-job-order.model';

describe('Component Tests', () => {
    describe('TaskJobOrder Management Update Component', () => {
        let comp: TaskJobOrderUpdateComponent;
        let fixture: ComponentFixture<TaskJobOrderUpdateComponent>;
        let service: TaskJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [TaskJobOrderUpdateComponent]
            })
                .overrideTemplate(TaskJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.task = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaskJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.task = entity;
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
