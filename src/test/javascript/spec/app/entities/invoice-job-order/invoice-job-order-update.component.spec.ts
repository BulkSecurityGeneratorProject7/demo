/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { InvoiceJobOrderUpdateComponent } from 'app/entities/invoice-job-order/invoice-job-order-update.component';
import { InvoiceJobOrderService } from 'app/entities/invoice-job-order/invoice-job-order.service';
import { InvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

describe('Component Tests', () => {
    describe('InvoiceJobOrder Management Update Component', () => {
        let comp: InvoiceJobOrderUpdateComponent;
        let fixture: ComponentFixture<InvoiceJobOrderUpdateComponent>;
        let service: InvoiceJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [InvoiceJobOrderUpdateComponent]
            })
                .overrideTemplate(InvoiceJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoiceJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new InvoiceJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.invoice = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new InvoiceJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.invoice = entity;
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
