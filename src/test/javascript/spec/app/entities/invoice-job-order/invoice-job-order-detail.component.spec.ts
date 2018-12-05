/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { InvoiceJobOrderDetailComponent } from 'app/entities/invoice-job-order/invoice-job-order-detail.component';
import { InvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

describe('Component Tests', () => {
    describe('InvoiceJobOrder Management Detail Component', () => {
        let comp: InvoiceJobOrderDetailComponent;
        let fixture: ComponentFixture<InvoiceJobOrderDetailComponent>;
        const route = ({ data: of({ invoice: new InvoiceJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [InvoiceJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InvoiceJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoiceJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.invoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
