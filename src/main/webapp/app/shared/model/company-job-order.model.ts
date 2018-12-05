export interface ICompanyJobOrder {
    id?: number;
    company?: string;
}

export class CompanyJobOrder implements ICompanyJobOrder {
    constructor(public id?: number, public company?: string) {}
}
