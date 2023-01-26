import { Model } from "_/types"

export interface Measurement extends Model {
    totem_id: string,
    date_time: Date,
    temperature?: number,
    humidity?: number,
    carbon_monoxide_level?: number,
    carbon_dioxide_level?: number,
    nitrogen_dioxide_level?: number,
    particulate_matter_level?: number
    pressure?: number
    altitude?: number
    ammonia?: number
    
}

export type MeasurementDto = {
    id?: string,
    totem_id: string,
    date_time: Date,
    temperature?: number,
    humidity?: number,
    carbon_monoxide_level?: number,
    carbon_dioxide_level?: number,
    nitrogen_dioxide_level?: number,
    particulate_matter_level?: number
    pressure?: number
    altitude?: number
    ammonia?: number
}

export type MeasurementMqttDTO = {
    co2?: string
    smoke?: string
    temperature?: string
    pressure?: string
    altitude?: string
    co?: string
    no2?: string
    nh3?: string
    humidity?: string
    key: string
    datetime: string
}


