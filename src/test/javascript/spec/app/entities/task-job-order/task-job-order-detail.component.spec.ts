/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { TaskJobOrderDetailComponent } from 'app/entities/task-job-order/task-job-order-detail.component';
import { TaskJobOrder } from 'app/shared/model/task-job-order.model';

describe('Component Tests', () => {
    describe('TaskJobOrder Management Detail Component', () => {
        let comp: TaskJobOrderDetailComponent;
        let fixture: ComponentFixture<TaskJobOrderDetailComponent>;
        const route = ({ data: of({ task: new TaskJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [TaskJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
