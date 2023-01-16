import { Model } from "_/types"

export interface Measurement extends Model {
    totem_id: string,
    temperature: number,
    humidity: number,
    date_time: number,
    carbon_monoxide_level: number,
    nitrogen_dioxide_level: number,
    particulate_matter_level: boolean
}

export type MeasurementDto = {
    id?: string,
    totem_id: string,
    temperature: number,
    humidity: number,
    date_time: number,
    carbon_monoxide_level: number,
    nitrogen_dioxide_level: number,
    particulate_matter_level: boolean
}


