export interface ILocationJobOrder {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    phoneNumber?: string;
    companyId?: number;
}

export class LocationJobOrder implements ILocationJobOrder {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public phoneNumber?: string,
        public companyId?: number
    ) {}
}
