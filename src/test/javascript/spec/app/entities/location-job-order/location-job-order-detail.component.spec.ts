/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestozoomTestModule } from '../../../test.module';
import { LocationJobOrderDetailComponent } from 'app/entities/location-job-order/location-job-order-detail.component';
import { LocationJobOrder } from 'app/shared/model/location-job-order.model';

describe('Component Tests', () => {
    describe('LocationJobOrder Management Detail Component', () => {
        let comp: LocationJobOrderDetailComponent;
        let fixture: ComponentFixture<LocationJobOrderDetailComponent>;
        const route = ({ data: of({ location: new LocationJobOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestozoomTestModule],
                declarations: [LocationJobOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LocationJobOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationJobOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
