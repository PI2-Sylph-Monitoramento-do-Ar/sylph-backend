
import { Measurement, MeasurementDto } from "_/types"

export const mapBodyToMeasurement = (body: MeasurementDto): Measurement => {
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