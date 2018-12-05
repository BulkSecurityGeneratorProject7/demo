import { IJobJobOrder } from 'app/shared/model//job-job-order.model';

export interface ITaskJobOrder {
    id?: number;
    title?: string;
    description?: string;
    amount?: number;
    jobs?: IJobJobOrder[];
}

export class TaskJobOrder implements ITaskJobOrder {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public amount?: number,
        public jobs?: IJobJobOrder[]
    ) {}
}
