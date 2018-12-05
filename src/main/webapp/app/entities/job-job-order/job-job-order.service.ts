import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobJobOrder } from 'app/shared/model/job-job-order.model';

type EntityResponseType = HttpResponse<IJobJobOrder>;
type EntityArrayResponseType = HttpResponse<IJobJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class JobJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/jobs';

    constructor(private http: HttpClient) {}

    create(job: IJobJobOrder): Observable<EntityResponseType> {
        return this.http.post<IJobJobOrder>(this.resourceUrl, job, { observe: 'response' });
    }

    update(job: IJobJobOrder): Observable<EntityResponseType> {
        return this.http.put<IJobJobOrder>(this.resourceUrl, job, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJobJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJobJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
