/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { DepartmentJobOrderDetailComponent } from 'app/entities/department-job-order/department-job-order-detail.component';
import { DepartmentJobOrder } from 'app/shared/model/department-job-order.model';

describe('Component Tests', () => {
    describe('DepartmentJobOrder Management Detail Component', () => {
        let comp: DepartmentJobOrderDetailComponent;
        let fixture: ComponentFixture<DepartmentJobOrderDetailComponent>;
        const route = ({ data: of({ department: new DepartmentJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [DepartmentJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DepartmentJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
