import { Model } from "_/types"

interface Location {
    latitude: number; 
    longitute: number;
}
export interface Totem  extends Model {
    mac_address: string,
    is_active: boolean,
    location: Location, 
    email: string
}

export type TotemDto = {
    mac_address: string,
    is_active: boolean,
    location: Location
}