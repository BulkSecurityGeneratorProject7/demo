/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientJobOrderDetailComponent } from 'app/entities/client-job-order/client-job-order-detail.component';
import { ClientJobOrder } from 'app/shared/model/client-job-order.model';

describe('Component Tests', () => {
    describe('ClientJobOrder Management Detail Component', () => {
        let comp: ClientJobOrderDetailComponent;
        let fixture: ComponentFixture<ClientJobOrderDetailComponent>;
        const route = ({ data: of({ client: new ClientJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClientJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClientJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.client).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
