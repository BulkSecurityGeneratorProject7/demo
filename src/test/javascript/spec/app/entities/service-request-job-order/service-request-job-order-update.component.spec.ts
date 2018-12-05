/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestJobOrderUpdateComponent } from 'app/entities/service-request-job-order/service-request-job-order-update.component';
import { ServiceRequestJobOrderService } from 'app/entities/service-request-job-order/service-request-job-order.service';
import { ServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestJobOrder Management Update Component', () => {
        let comp: ServiceRequestJobOrderUpdateComponent;
        let fixture: ComponentFixture<ServiceRequestJobOrderUpdateComponent>;
        let service: ServiceRequestJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestJobOrderUpdateComponent]
            })
                .overrideTemplate(ServiceRequestJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceRequestJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ServiceRequestJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.serviceRequest = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ServiceRequestJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.serviceRequest = entity;
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
