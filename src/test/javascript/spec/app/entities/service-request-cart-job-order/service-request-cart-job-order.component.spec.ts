/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestCartJobOrderComponent } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order.component';
import { ServiceRequestCartJobOrderService } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order.service';
import { ServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestCartJobOrder Management Component', () => {
        let comp: ServiceRequestCartJobOrderComponent;
        let fixture: ComponentFixture<ServiceRequestCartJobOrderComponent>;
        let service: ServiceRequestCartJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestCartJobOrderComponent],
                providers: []
            })
                .overrideTemplate(ServiceRequestCartJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceRequestCartJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestCartJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ServiceRequestCartJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.serviceRequestCarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
