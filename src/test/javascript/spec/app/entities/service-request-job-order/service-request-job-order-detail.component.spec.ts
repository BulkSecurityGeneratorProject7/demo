/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestJobOrderDetailComponent } from 'app/entities/service-request-job-order/service-request-job-order-detail.component';
import { ServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestJobOrder Management Detail Component', () => {
        let comp: ServiceRequestJobOrderDetailComponent;
        let fixture: ComponentFixture<ServiceRequestJobOrderDetailComponent>;
        const route = ({ data: of({ serviceRequest: new ServiceRequestJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ServiceRequestJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServiceRequestJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.serviceRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
