/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientLocationJobOrderUpdateComponent } from 'app/entities/client-location-job-order/client-location-job-order-update.component';
import { ClientLocationJobOrderService } from 'app/entities/client-location-job-order/client-location-job-order.service';
import { ClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

describe('Component Tests', () => {
    describe('ClientLocationJobOrder Management Update Component', () => {
        let comp: ClientLocationJobOrderUpdateComponent;
        let fixture: ComponentFixture<ClientLocationJobOrderUpdateComponent>;
        let service: ClientLocationJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientLocationJobOrderUpdateComponent]
            })
                .overrideTemplate(ClientLocationJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientLocationJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientLocationJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClientLocationJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.clientLocation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ClientLocationJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.clientLocation = entity;
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
