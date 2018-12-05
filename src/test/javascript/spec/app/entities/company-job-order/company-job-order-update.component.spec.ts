/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { CompanyJobOrderUpdateComponent } from 'app/entities/company-job-order/company-job-order-update.component';
import { CompanyJobOrderService } from 'app/entities/company-job-order/company-job-order.service';
import { CompanyJobOrder } from 'app/shared/model/company-job-order.model';

describe('Component Tests', () => {
    describe('CompanyJobOrder Management Update Component', () => {
        let comp: CompanyJobOrderUpdateComponent;
        let fixture: ComponentFixture<CompanyJobOrderUpdateComponent>;
        let service: CompanyJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [CompanyJobOrderUpdateComponent]
            })
                .overrideTemplate(CompanyJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.company = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.company = entity;
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
