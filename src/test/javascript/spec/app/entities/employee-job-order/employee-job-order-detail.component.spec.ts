/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { EmployeeJobOrderDetailComponent } from 'app/entities/employee-job-order/employee-job-order-detail.component';
import { EmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

describe('Component Tests', () => {
    describe('EmployeeJobOrder Management Detail Component', () => {
        let comp: EmployeeJobOrderDetailComponent;
        let fixture: ComponentFixture<EmployeeJobOrderDetailComponent>;
        const route = ({ data: of({ employee: new EmployeeJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [EmployeeJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmployeeJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
