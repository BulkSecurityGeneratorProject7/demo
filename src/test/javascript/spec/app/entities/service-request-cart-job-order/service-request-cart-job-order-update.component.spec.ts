/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestCartJobOrderUpdateComponent } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order-update.component';
import { ServiceRequestCartJobOrderService } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order.service';
import { ServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestCartJobOrder Management Update Component', () => {
        let comp: ServiceRequestCartJobOrderUpdateComponent;
        let fixture: ComponentFixture<ServiceRequestCartJobOrderUpdateComponent>;
        let service: ServiceRequestCartJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestCartJobOrderUpdateComponent]
            })
                .overrideTemplate(ServiceRequestCartJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceRequestCartJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestCartJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ServiceRequestCartJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.serviceRequestCart = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ServiceRequestCartJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.serviceRequestCart = entity;
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
