import { Measurement } from "_/models";

export const mapMeasurementByHours = (measurements: Array<Measurement>) => {
    const hoursWithTwoDigits = [...Array(24).keys()].map(hour => hour.toString().padStart(2, '0'))
    const measurementsByHour = {}
    hoursWithTwoDigits.forEach(hour => measurementsByHour[hour] = [])
    for(const measurement of measurements){
        const hour = measurement.date_time.toISOString().split('T')[1].slice(0,2)
        measurementsByHour[hour].push(measurement.temperature)
    }
    return measurementsByHour;
}