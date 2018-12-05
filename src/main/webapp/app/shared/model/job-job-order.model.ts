import { ITaskJobOrder } from 'app/shared/model//task-job-order.model';

export interface IJobJobOrder {
    id?: number;
    jobTitle?: string;
    minSalary?: number;
    maxSalary?: number;
    employeeId?: number;
    tasks?: ITaskJobOrder[];
}

export class JobJobOrder implements IJobJobOrder {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public employeeId?: number,
        public tasks?: ITaskJobOrder[]
    ) {}
}
