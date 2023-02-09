
import { Measurement, MeasurementDto } from "_/models"
import { genereateId } from "./generate-id";

export const mapBodyToMeasurement = (body: MeasurementDto): Measurement => {
    const { 
            id,
            totem_id,
            temperature,
            humidity,
            date_time,
            carbon_monoxide_level,
            nitrogen_dioxide_level,
            particulate_matter_level,
            altitude, 
            ammonia, 
            ozone_level, 
            pressure
        } = body;
    return {
        id: id || genereateId(),
        totem_id,
        temperature,
        humidity,
        date_time,
        carbon_monoxide_level,
        nitrogen_dioxide_level,
        particulate_matter_level,
        altitude, 
        ammonia, 
        ozone_level, 
        pressure
    }
}