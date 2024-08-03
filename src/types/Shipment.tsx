// types.ts
export interface ShipmentData {
    IdUser: string;
    Company: string;
    Region: string;
    Province: string;
    District: string;
    Address: string;
}

export interface Shipment {
    IdShipment: number;
    IdUser: number;
    Company: string;
    Region: string;
    Province: string;
    District: string;
    Address: string;
    DateAdd: string;
}

export interface LastShipmentResponse {
    msg: string;
    data: Shipment[];
    success: boolean;
}
