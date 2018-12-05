import { Moment } from 'moment';
import { IJobJobOrder } from 'app/shared/model//job-job-order.model';

export interface IEmployeeJobOrder {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    hireDate?: Moment;
    salary?: number;
    commissionPct?: number;
    departmentId?: number;
    jobs?: IJobJobOrder[];
    managerId?: number;
}

export class EmployeeJobOrder implements IEmployeeJobOrder {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public hireDate?: Moment,
        public salary?: number,
        public commissionPct?: number,
        public departmentId?: number,
        public jobs?: IJobJobOrder[],
        public managerId?: number
    ) {}
}
