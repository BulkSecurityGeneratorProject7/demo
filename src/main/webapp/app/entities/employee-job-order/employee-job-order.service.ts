import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeJobOrder } from 'app/shared/model/employee-job-order.model';

type EntityResponseType = HttpResponse<IEmployeeJobOrder>;
type EntityArrayResponseType = HttpResponse<IEmployeeJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient) {}

    create(employee: IEmployeeJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .post<IEmployeeJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(employee: IEmployeeJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .put<IEmployeeJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmployeeJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(employee: IEmployeeJobOrder): IEmployeeJobOrder {
        const copy: IEmployeeJobOrder = Object.assign({}, employee, {
            hireDate: employee.hireDate != null && employee.hireDate.isValid() ? employee.hireDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((employee: IEmployeeJobOrder) => {
                employee.hireDate = employee.hireDate != null ? moment(employee.hireDate) : null;
            });
        }
        return res;
    }
}
