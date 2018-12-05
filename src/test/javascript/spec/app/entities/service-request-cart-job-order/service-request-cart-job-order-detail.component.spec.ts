/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ServiceRequestCartJobOrderDetailComponent } from 'app/entities/service-request-cart-job-order/service-request-cart-job-order-detail.component';
import { ServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

describe('Component Tests', () => {
    describe('ServiceRequestCartJobOrder Management Detail Component', () => {
        let comp: ServiceRequestCartJobOrderDetailComponent;
        let fixture: ComponentFixture<ServiceRequestCartJobOrderDetailComponent>;
        const route = ({ data: of({ serviceRequestCart: new ServiceRequestCartJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ServiceRequestCartJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ServiceRequestCartJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServiceRequestCartJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.serviceRequestCart).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
