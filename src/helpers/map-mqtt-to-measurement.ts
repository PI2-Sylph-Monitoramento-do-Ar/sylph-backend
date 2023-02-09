import { Measurement, MeasurementMqttDTO } from "_/models";
import { tryParseNumber } from "_/utils/try-parse-number";
import _ from "lodash"

export const mapMqttToMeasurement = (measurementDto: MeasurementMqttDTO): Measurement => {
    const { 
        datetime, 
        key, 
        altitude, 
        o3, 
        co, 
        nh3, 
        no2, 
        pressure, 
        smoke, 
        temperature, 
        humidity, 
        totem_id
    } = measurementDto

    const measurement =  {
        date_time: new Date(datetime), 
        id: key, 
        totem_id, 
        altitude: tryParseNumber(altitude), 
        ammonia: tryParseNumber(nh3), 
        ozone_level: tryParseNumber(o3), 
        carbon_monoxide_level: tryParseNumber(co), 
        humidity: tryParseNumber(humidity), 
        nitrogen_dioxide_level: tryParseNumber(no2), 
        particulate_matter_level: tryParseNumber(smoke), 
        pressure: tryParseNumber(pressure), 
        temperature: tryParseNumber(temperature)
    }

    return _.omitBy(measurement, _.isNil) as Measurement
}
