/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientLocationJobOrderDetailComponent } from 'app/entities/client-location-job-order/client-location-job-order-detail.component';
import { ClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

describe('Component Tests', () => {
    describe('ClientLocationJobOrder Management Detail Component', () => {
        let comp: ClientLocationJobOrderDetailComponent;
        let fixture: ComponentFixture<ClientLocationJobOrderDetailComponent>;
        const route = ({ data: of({ clientLocation: new ClientLocationJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientLocationJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClientLocationJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientLocationJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.clientLocation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
