import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClientLocationJobOrder } from 'app/shared/model/client-location-job-order.model';

type EntityResponseType = HttpResponse<IClientLocationJobOrder>;
type EntityArrayResponseType = HttpResponse<IClientLocationJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class ClientLocationJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/client-locations';

    constructor(private http: HttpClient) {}

    create(clientLocation: IClientLocationJobOrder): Observable<EntityResponseType> {
        return this.http.post<IClientLocationJobOrder>(this.resourceUrl, clientLocation, { observe: 'response' });
    }

    update(clientLocation: IClientLocationJobOrder): Observable<EntityResponseType> {
        return this.http.put<IClientLocationJobOrder>(this.resourceUrl, clientLocation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClientLocationJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClientLocationJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
