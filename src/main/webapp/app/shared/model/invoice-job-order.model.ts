export const enum Payment {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    PAYPAL = 'PAYPAL',
    CHECK = 'CHECK',
    CASH = 'CASH',
    GIFTCARD = 'GIFTCARD'
}

export interface IInvoiceJobOrder {
    id?: number;
    amount?: number;
    payment?: Payment;
    serviceRequestId?: number;
}

export class InvoiceJobOrder implements IInvoiceJobOrder {
    constructor(public id?: number, public amount?: number, public payment?: Payment, public serviceRequestId?: number) {}
}
