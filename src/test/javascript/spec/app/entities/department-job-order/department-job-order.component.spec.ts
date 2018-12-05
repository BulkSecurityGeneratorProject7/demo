/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { DepartmentJobOrderComponent } from 'app/entities/department-job-order/department-job-order.component';
import { DepartmentJobOrderService } from 'app/entities/department-job-order/department-job-order.service';
import { DepartmentJobOrder } from 'app/shared/model/department-job-order.model';

describe('Component Tests', () => {
    describe('DepartmentJobOrder Management Component', () => {
        let comp: DepartmentJobOrderComponent;
        let fixture: ComponentFixture<DepartmentJobOrderComponent>;
        let service: DepartmentJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [DepartmentJobOrderComponent],
                providers: []
            })
                .overrideTemplate(DepartmentJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DepartmentJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
