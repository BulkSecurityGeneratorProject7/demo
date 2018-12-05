/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { ClientJobOrderComponent } from 'app/entities/client-job-order/client-job-order.component';
import { ClientJobOrderService } from 'app/entities/client-job-order/client-job-order.service';
import { ClientJobOrder } from 'app/shared/model/client-job-order.model';

describe('Component Tests', () => {
    describe('ClientJobOrder Management Component', () => {
        let comp: ClientJobOrderComponent;
        let fixture: ComponentFixture<ClientJobOrderComponent>;
        let service: ClientJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [ClientJobOrderComponent],
                providers: []
            })
                .overrideTemplate(ClientJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClientJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClientJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.clients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
