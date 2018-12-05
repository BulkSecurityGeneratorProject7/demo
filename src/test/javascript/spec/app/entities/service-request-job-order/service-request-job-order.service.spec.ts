/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ServiceRequestJobOrderService } from 'app/entities/service-request-job-order/service-request-job-order.service';
import { IServiceRequestJobOrder, ServiceRequestJobOrder, Service } from 'app/shared/model/service-request-job-order.model';

describe('Service Tests', () => {
    describe('ServiceRequestJobOrder Service', () => {
        let injector: TestBed;
        let service: ServiceRequestJobOrderService;
        let httpMock: HttpTestingController;
        let elemDefault: IServiceRequestJobOrder;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ServiceRequestJobOrderService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ServiceRequestJobOrder(0, Service.CLEANING, 0, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        startTime: currentDate.format(DATE_TIME_FORMAT),
                        endTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ServiceRequestJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        startTime: currentDate.format(DATE_TIME_FORMAT),
                        endTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startTime: currentDate,
                        endTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ServiceRequestJobOrder(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ServiceRequestJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        service: 'BBBBBB',
                        amount: 1,
                        startTime: currentDate.format(DATE_TIME_FORMAT),
                        endTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        startTime: currentDate,
                        endTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ServiceRequestJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        service: 'BBBBBB',
                        amount: 1,
                        startTime: currentDate.format(DATE_TIME_FORMAT),
                        endTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startTime: currentDate,
                        endTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a ServiceRequestJobOrder', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
