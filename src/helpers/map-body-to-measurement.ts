
import { Measurement, MeasurementDto } from "_/models"

export const mapBodyToMeasurement = (body: MeasurementDto): Omit<Measurement, '_id'> => {
    const { totem_id,
            temperature,
            humidity,
            date_time,
            carbon_monoxide_level,
            nitrogen_dioxide_level,
            particulate_matter_level
        } = body;
    return {
        totem_id,
        temperature,
        humidity,
        date_time,
        carbon_monoxide_level,
        nitrogen_dioxide_level,
        particulate_matter_level
    }
}