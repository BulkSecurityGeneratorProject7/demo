import { IEmployeeJobOrder } from 'app/shared/model//employee-job-order.model';

export interface IDepartmentJobOrder {
    id?: number;
    departmentName?: string;
    employees?: IEmployeeJobOrder[];
    locationId?: number;
}

export class DepartmentJobOrder implements IDepartmentJobOrder {
    constructor(public id?: number, public departmentName?: string, public employees?: IEmployeeJobOrder[], public locationId?: number) {}
}
