// 2D coordinate system [X,Y] on 8x8 grid 
export type Coordinate = [number, number];

// Any data model that wants to be saved in our database MUST have an 'id'
export interface Identifiable{
    id: string;
}

export interface CommercialOrder extends Identifiable{
    id: string;
    item: string;
    price: number;
    pickupLocation: Coordinate;
    deliveryLocation: Coordinate;
}

