/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { LocationJobOrderUpdateComponent } from 'app/entities/location-job-order/location-job-order-update.component';
import { LocationJobOrderService } from 'app/entities/location-job-order/location-job-order.service';
import { LocationJobOrder } from 'app/shared/model/location-job-order.model';

describe('Component Tests', () => {
    describe('LocationJobOrder Management Update Component', () => {
        let comp: LocationJobOrderUpdateComponent;
        let fixture: ComponentFixture<LocationJobOrderUpdateComponent>;
        let service: LocationJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [LocationJobOrderUpdateComponent]
            })
                .overrideTemplate(LocationJobOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationJobOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationJobOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new LocationJobOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.location = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new LocationJobOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.location = entity;
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
