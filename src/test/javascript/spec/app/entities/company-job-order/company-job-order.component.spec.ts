/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { CompanyJobOrderComponent } from 'app/entities/company-job-order/company-job-order.component';
import { CompanyJobOrderService } from 'app/entities/company-job-order/company-job-order.service';
import { CompanyJobOrder } from 'app/shared/model/company-job-order.model';

describe('Component Tests', () => {
    describe('CompanyJobOrder Management Component', () => {
        let comp: CompanyJobOrderComponent;
        let fixture: ComponentFixture<CompanyJobOrderComponent>;
        let service: CompanyJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [CompanyJobOrderComponent],
                providers: []
            })
                .overrideTemplate(CompanyJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
