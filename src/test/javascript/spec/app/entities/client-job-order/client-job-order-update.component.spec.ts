/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientJobOrderUpdateComponent } from 'app/entities/client-job-order/client-job-order-update.component';
import { ClientJobOrderService } from 'app/entities/client-job-order/client-job-order.service';
import { ClientJobOrder } from 'app/shared/model/client-job-order.model';

describe('Component Tests', () => {
    describe('ClientJobOrder Management Update Component', () => {
        let comp: ClientJobOrderUpdateComponent;
        let fixture: ComponentFixture<ClientJobOrderUpdateComponent>;
        let service: ClientJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientJobOrderUpdateComponent]
            })
                .overrideTemplate(ClientJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClientJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.client = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClientJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.client = entity;
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
