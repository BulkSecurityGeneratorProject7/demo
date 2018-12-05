import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaskJobOrder } from 'app/shared/model/task-job-order.model';

type EntityResponseType = HttpResponse<ITaskJobOrder>;
type EntityArrayResponseType = HttpResponse<ITaskJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class TaskJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/tasks';

    constructor(private http: HttpClient) {}

    create(task: ITaskJobOrder): Observable<EntityResponseType> {
        return this.http.post<ITaskJobOrder>(this.resourceUrl, task, { observe: 'response' });
    }

    update(task: ITaskJobOrder): Observable<EntityResponseType> {
        return this.http.put<ITaskJobOrder>(this.resourceUrl, task, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaskJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITaskJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
