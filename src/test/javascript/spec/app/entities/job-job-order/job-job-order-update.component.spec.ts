/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { JobJobOrderUpdateComponent } from 'app/entities/job-job-order/job-job-order-update.component';
import { JobJobOrderService } from 'app/entities/job-job-order/job-job-order.service';
import { JobJobOrder } from 'app/shared/model/job-job-order.model';

describe('Component Tests', () => {
    describe('JobJobOrder Management Update Component', () => {
        let comp: JobJobOrderUpdateComponent;
        let fixture: ComponentFixture<JobJobOrderUpdateComponent>;
        let service: JobJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobJobOrderUpdateComponent]
            })
                .overrideTemplate(JobJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.job = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.job = entity;
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
