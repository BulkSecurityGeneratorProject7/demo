export interface IClientLocationJobOrder {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    clientId?: number;
}

export class ClientLocationJobOrder implements IClientLocationJobOrder {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public clientId?: number
    ) {}
}
