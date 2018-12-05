/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { CompanyJobOrderDetailComponent } from 'app/entities/company-job-order/company-job-order-detail.component';
import { CompanyJobOrder } from 'app/shared/model/company-job-order.model';

describe('Component Tests', () => {
    describe('CompanyJobOrder Management Detail Component', () => {
        let comp: CompanyJobOrderDetailComponent;
        let fixture: ComponentFixture<CompanyJobOrderDetailComponent>;
        const route = ({ data: of({ company: new CompanyJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [CompanyJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.company).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
