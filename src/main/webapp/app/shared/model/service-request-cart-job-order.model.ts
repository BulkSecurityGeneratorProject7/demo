import { Moment } from 'moment';

export interface IServiceRequestCartJobOrder {
    id?: number;
    description?: string;
    date?: Moment;
}

export class ServiceRequestCartJobOrder implements IServiceRequestCartJobOrder {
    constructor(public id?: number, public description?: string, public date?: Moment) {}
}
