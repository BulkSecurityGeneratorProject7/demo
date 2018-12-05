import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoiceJobOrder } from 'app/shared/model/invoice-job-order.model';

type EntityResponseType = HttpResponse<IInvoiceJobOrder>;
type EntityArrayResponseType = HttpResponse<IInvoiceJobOrder[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceJobOrderService {
    public resourceUrl = SERVER_API_URL + 'api/invoices';

    constructor(private http: HttpClient) {}

    create(invoice: IInvoiceJobOrder): Observable<EntityResponseType> {
        return this.http.post<IInvoiceJobOrder>(this.resourceUrl, invoice, { observe: 'response' });
    }

    update(invoice: IInvoiceJobOrder): Observable<EntityResponseType> {
        return this.http.put<IInvoiceJobOrder>(this.resourceUrl, invoice, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInvoiceJobOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInvoiceJobOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
