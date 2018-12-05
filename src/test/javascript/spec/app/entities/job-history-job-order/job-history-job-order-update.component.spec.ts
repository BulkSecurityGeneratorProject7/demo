/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { JobHistoryJobOrderUpdateComponent } from 'app/entities/job-history-job-order/job-history-job-order-update.component';
import { JobHistoryJobOrderService } from 'app/entities/job-history-job-order/job-history-job-order.service';
import { JobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';

describe('Component Tests', () => {
    describe('JobHistoryJobOrder Management Update Component', () => {
        let comp: JobHistoryJobOrderUpdateComponent;
        let fixture: ComponentFixture<JobHistoryJobOrderUpdateComponent>;
        let service: JobHistoryJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobHistoryJobOrderUpdateComponent]
            })
                .overrideTemplate(JobHistoryJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobHistoryJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobHistoryJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobHistoryJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobHistory = entity;
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
