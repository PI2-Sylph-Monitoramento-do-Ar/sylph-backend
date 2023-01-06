import { Model } from "_/types"

export interface Totem  extends Model {
    _id: string,
    mac_addres: string,
    is_active: boolean,
    location: number[]
}

export type TotemDto = {
    mac_addres: string,
    is_active: boolean,
    location: number[]
}