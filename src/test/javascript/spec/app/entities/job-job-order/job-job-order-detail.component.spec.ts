/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { JobJobOrderDetailComponent } from 'app/entities/job-job-order/job-job-order-detail.component';
import { JobJobOrder } from 'app/shared/model/job-job-order.model';

describe('Component Tests', () => {
    describe('JobJobOrder Management Detail Component', () => {
        let comp: JobJobOrderDetailComponent;
        let fixture: ComponentFixture<JobJobOrderDetailComponent>;
        const route = ({ data: of({ job: new JobJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
