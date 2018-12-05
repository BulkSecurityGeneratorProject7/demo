import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceRequestJobOrder } from 'app/shared/model/service-request-job-order.model';

type EntityResponseType = HttpResponse<IServiceRequestJobOrder>;
type EntityArrayResponseType = HttpResponse<IServiceRequestJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class ServiceRequestJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/service-requests';

    constructor(private http: HttpClient) {}

    create(serviceRequest: IServiceRequestJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(serviceRequest);
        return this.http
            .post<IServiceRequestJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(serviceRequest: IServiceRequestJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(serviceRequest);
        return this.http
            .put<IServiceRequestJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IServiceRequestJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IServiceRequestJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(serviceRequest: IServiceRequestJobOrder): IServiceRequestJobOrder {
        const copy: IServiceRequestJobOrder = Object.assign({}, serviceRequest, {
            startTime: serviceRequest.startTime != null && serviceRequest.startTime.isValid() ? serviceRequest.startTime.toJSON() : null,
            endTime: serviceRequest.endTime != null && serviceRequest.endTime.isValid() ? serviceRequest.endTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
            res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((serviceRequest: IServiceRequestJobOrder) => {
                serviceRequest.startTime = serviceRequest.startTime != null ? moment(serviceRequest.startTime) : null;
                serviceRequest.endTime = serviceRequest.endTime != null ? moment(serviceRequest.endTime) : null;
            });
        }
        return res;
    }
}
