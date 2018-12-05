/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestJobOrderComponent } from 'app/entities/service-request-job-order/service-request-job-order.component';
import { ServiceRequestJobOrderService } from 'app/entities/service-request-job-order/service-request-job-order.service';
import { ServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestJobOrder Management Component', () => {
        let comp: ServiceRequestJobOrderComponent;
        let fixture: ComponentFixture<ServiceRequestJobOrderComponent>;
        let service: ServiceRequestJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestJobOrderComponent],
                providers: []
            })
                .overrideTemplate(ServiceRequestJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServiceRequestJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ServiceRequestJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.serviceRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
