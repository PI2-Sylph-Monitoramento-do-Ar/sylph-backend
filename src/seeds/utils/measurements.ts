import { genereateId } from "_/helpers/generate-id";
import { Measurement, Totem } from "_/models";

const MASUREMENTS_AMOUNT = 300
const DAY_IN_MILI = 86400000

export const gerenerateMeasurements  = (totem: Totem): Measurement[] => {
    const measurements: Measurement[] = []
    
    const today_in_mili = new Date().getTime()
    const offset_in_mili = (30 * DAY_IN_MILI) / MASUREMENTS_AMOUNT

    for(let i = 0; i < MASUREMENTS_AMOUNT ; i++){
        measurements.push({
            id: genereateId(), 
            totem_id: totem.id, 
            carbon_monoxide_level: Math.random() * 10,
            date_time: new Date(today_in_mili - offset_in_mili * i), 
            humidity: Math.random() * 100, 
            nitrogen_dioxide_level: Math.random() * 10, 
            particulate_matter_level: Math.random() * 10, 
            temperature: Math.floor(Math.random() * 40),
            altitude:  Math.random() * 10,
            ammonia: Math.random() * 10,
            ozone_level: Math.random() * 10,
            pressure:  Math.random() * 10
        })
    }
    return measurements
}