/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmployeeJobOrderService } from 'app/entities/employee-job-order/employee-job-order.service';
import { IEmployeeJobOrder, EmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

describe('Service Tests', () => {
    describe('EmployeeJobOrder Service', () => {
        let injector: TestBed;
        let service: EmployeeJobOrderService;
        let httpMock: HttpTestingController;
        let elemDefault: IEmployeeJobOrder;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EmployeeJobOrderService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new EmployeeJobOrder(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a EmployeeJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        hireDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new EmployeeJobOrder(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EmployeeJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        hireDate: currentDate.format(DATE_TIME_FORMAT),
                        salary: 1,
                        commissionPct: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        hireDate: currentDate
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

            it('should return a list of EmployeeJobOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        email: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        hireDate: currentDate.format(DATE_TIME_FORMAT),
                        salary: 1,
                        commissionPct: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        hireDate: currentDate
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

            it('should delete a EmployeeJobOrder', async () => {
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
