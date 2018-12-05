/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { JobHistoryJobOrderDetailComponent } from 'app/entities/job-history-job-order/job-history-job-order-detail.component';
import { JobHistoryJobOrder } from 'app/shared/model/job-history-job-order.model';

describe('Component Tests', () => {
    describe('JobHistoryJobOrder Management Detail Component', () => {
        let comp: JobHistoryJobOrderDetailComponent;
        let fixture: ComponentFixture<JobHistoryJobOrderDetailComponent>;
        const route = ({ data: of({ jobHistory: new JobHistoryJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [JobHistoryJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobHistoryJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
