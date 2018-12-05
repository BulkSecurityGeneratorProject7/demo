import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocationJobOrder } from 'app/shared/model/location-job-order.model';

type EntityResponseType = HttpResponse<ILocationJobOrder>;
type EntityArrayResponseType = HttpResponse<ILocationJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class LocationJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocationJobOrder): Observable<EntityResponseType> {
        return this.http.post<ILocationJobOrder>(this.resourceUrl, location, { observe: 'response' });
    }

    update(location: ILocationJobOrder): Observable<EntityResponseType> {
        return this.http.put<ILocationJobOrder>(this.resourceUrl, location, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILocationJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILocationJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
