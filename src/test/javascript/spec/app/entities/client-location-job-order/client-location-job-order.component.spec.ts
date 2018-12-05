/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientLocationJobOrderComponent } from 'app/entities/client-location-job-order/client-location-job-order.component';
import { ClientLocationJobOrderService } from 'app/entities/client-location-job-order/client-location-job-order.service';
import { ClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

describe('Component Tests', () => {
    describe('ClientLocationJobOrder Management Component', () => {
        let comp: ClientLocationJobOrderComponent;
        let fixture: ComponentFixture<ClientLocationJobOrderComponent>;
        let service: ClientLocationJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientLocationJobOrderComponent],
                providers: []
            })
                .overrideTemplate(ClientLocationJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientLocationJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientLocationJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClientLocationJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.clientLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
