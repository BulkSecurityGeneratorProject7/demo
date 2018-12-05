import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyJobOrder } from 'app/shared/model/company-job-order.model';

type EntityResponseType = HttpResponse<ICompanyJobOrder>;
type EntityArrayResponseType = HttpResponse<ICompanyJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class CompanyJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) {}

    create(company: ICompanyJobOrder): Observable<EntityResponseType> {
        return this.http.post<ICompanyJobOrder>(this.resourceUrl, company, { observe: 'response' });
    }

    update(company: ICompanyJobOrder): Observable<EntityResponseType> {
        return this.http.put<ICompanyJobOrder>(this.resourceUrl, company, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
