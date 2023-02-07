import { Model } from "_/types"

interface Location {
    latitude: number; 
    longitude: number;
}
export interface Totem  extends Model {
    mac_address: string,
    is_active: boolean,
    location: Location, 
    email: string
    name: string
}

export type TotemDto = {
    id?: string,
    mac_address: string,
    is_active: boolean,
    location: Location,
    name: string
}