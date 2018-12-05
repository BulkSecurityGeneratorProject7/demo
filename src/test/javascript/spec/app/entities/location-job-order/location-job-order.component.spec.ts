/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { LocationJobOrderComponent } from 'app/entities/location-job-order/location-job-order.component';
import { LocationJobOrderService } from 'app/entities/location-job-order/location-job-order.service';
import { LocationJobOrder } from 'app/shared/model/location-job-order.model';

describe('Component Tests', () => {
    describe('LocationJobOrder Management Component', () => {
        let comp: LocationJobOrderComponent;
        let fixture: ComponentFixture<LocationJobOrderComponent>;
        let service: LocationJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [LocationJobOrderComponent],
                providers: []
            })
                .overrideTemplate(LocationJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocationJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
