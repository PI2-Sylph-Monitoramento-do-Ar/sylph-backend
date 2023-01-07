
import { Measurement, MeasurementDto } from "_/models"
import { genereateId } from "./generate-id";

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
        id: genereateId(),
        totem_id,
        temperature,
        humidity,
        date_time,
        carbon_monoxide_level,
        nitrogen_dioxide_level,
        particulate_matter_level
    }
}