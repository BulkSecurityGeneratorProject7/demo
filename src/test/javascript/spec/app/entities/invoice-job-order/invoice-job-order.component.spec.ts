/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { InvoiceJobOrderComponent } from 'app/entities/invoice-job-order/invoice-job-order.component';
import { InvoiceJobOrderService } from 'app/entities/invoice-job-order/invoice-job-order.service';
import { InvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

describe('Component Tests', () => {
    describe('InvoiceJobOrder Management Component', () => {
        let comp: InvoiceJobOrderComponent;
        let fixture: ComponentFixture<InvoiceJobOrderComponent>;
        let service: InvoiceJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [InvoiceJobOrderComponent],
                providers: []
            })
                .overrideTemplate(InvoiceJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoiceJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InvoiceJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.invoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
