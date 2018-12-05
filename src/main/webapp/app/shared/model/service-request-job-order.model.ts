import { Moment } from 'moment';

export const enum Service {
    CLEANING = 'CLEANING',
    MAINTENANCE = 'MAINTENANCE',
    STAFFING = 'STAFFING',
    PLUBMING_ELECTRICAL = 'PLUBMING_ELECTRICAL',
    IT_SECRUITY = 'IT_SECRUITY',
    DECOR = 'DECOR',
    MOVING = 'MOVING',
    OFFICE_HELP = 'OFFICE_HELP',
    EVENT_SUPPORT = 'EVENT_SUPPORT'
}

export interface IServiceRequestJobOrder {
    id?: number;
    service?: Service;
    amount?: number;
    startTime?: Moment;
    endTime?: Moment;
    invoiceId?: number;
    jobOrderId?: number;
    clientLocationId?: number;
    cartNoId?: number;
}

export class ServiceRequestJobOrder implements IServiceRequestJobOrder {
    constructor(
        public id?: number,
        public service?: Service,
        public amount?: number,
        public startTime?: Moment,
        public endTime?: Moment,
        public invoiceId?: number,
        public jobOrderId?: number,
        public clientLocationId?: number,
        public cartNoId?: number
    ) {}
}
