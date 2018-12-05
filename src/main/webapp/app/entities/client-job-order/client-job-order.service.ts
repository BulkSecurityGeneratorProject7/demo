import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClientJobOrder } from 'app/shared/model/client-job-order.model';

type EntityResponseType = HttpResponse<IClientJobOrder>;
type EntityArrayResponseType = HttpResponse<IClientJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class ClientJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/clients';

    constructor(private http: HttpClient) {}

    create(client: IClientJobOrder): Observable<EntityResponseType> {
        return this.http.post<IClientJobOrder>(this.resourceUrl, client, { observe: 'response' });
    }

    update(client: IClientJobOrder): Observable<EntityResponseType> {
        return this.http.put<IClientJobOrder>(this.resourceUrl, client, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClientJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClientJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
