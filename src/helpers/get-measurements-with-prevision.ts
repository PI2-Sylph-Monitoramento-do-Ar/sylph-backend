import { HttpsAdapter } from "_/adapters/http-adapters";
import { envs } from "_/config/env";
import { Measurement } from "_/models";
import { PrevisionService } from "_/services/prevision/prevision-service";
import { getNextSixHours } from "./get-next-six-hours";
import { mapMeasurementByHours } from "./map-measurements-by-hour";

export const getMeasurementsWithPrevision = async (measurements: Array<Measurement>) => {
    const measurementByHour = mapMeasurementByHours(measurements)
    const previsionService = new PrevisionService(new HttpsAdapter(envs.previsionServiceuRL))
    const nextSixHours = getNextSixHours()
    const previsions = {}
    for(const hour in nextSixHours){
        const stringHour = hour.toString().padStart(2, '0')
        const nextMeasurement = measurementByHour[stringHour].length > 0? await previsionService.getPrevision(measurementByHour[stringHour]) : -1
        previsions[stringHour] = nextMeasurement
    }
    return {
        measurements,
        previsions
    }

}