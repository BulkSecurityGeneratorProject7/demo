import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceRequestCartJobOrder } from 'app/shared/model/service-request-cart-job-order.model';

type EntityResponseType = HttpResponse<IServiceRequestCartJobOrder>;
type EntityArrayResponseType = HttpResponse<IServiceRequestCartJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class ServiceRequestCartJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/service-request-carts';

    constructor(private http: HttpClient) {}

    create(serviceRequestCart: IServiceRequestCartJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(serviceRequestCart);
        return this.http
            .post<IServiceRequestCartJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(serviceRequestCart: IServiceRequestCartJobOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(serviceRequestCart);
        return this.http
            .put<IServiceRequestCartJobOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IServiceRequestCartJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IServiceRequestCartJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(serviceRequestCart: IServiceRequestCartJobOrder): IServiceRequestCartJobOrder {
        const copy: IServiceRequestCartJobOrder = Object.assign({}, serviceRequestCart, {
            date: serviceRequestCart.date != null && serviceRequestCart.date.isValid() ? serviceRequestCart.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((serviceRequestCart: IServiceRequestCartJobOrder) => {
                serviceRequestCart.date = serviceRequestCart.date != null ? moment(serviceRequestCart.date) : null;
            });
        }
        return res;
    }
}
