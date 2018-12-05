/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestozoomTestModule } from '../../../test.module';
import { TaskJobOrderComponent } from 'app/entities/task-job-order/task-job-order.component';
import { TaskJobOrderService } from 'app/entities/task-job-order/task-job-order.service';
import { TaskJobOrder } from 'app/shared/model/task-job-order.model';

describe('Component Tests', () => {
    describe('TaskJobOrder Management Component', () => {
        let comp: TaskJobOrderComponent;
        let fixture: ComponentFixture<TaskJobOrderComponent>;
        let service: TaskJobOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [TaskJobOrderComponent],
                providers: []
            })
                .overrideTemplate(TaskJobOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskJobOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskJobOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TaskJobOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
