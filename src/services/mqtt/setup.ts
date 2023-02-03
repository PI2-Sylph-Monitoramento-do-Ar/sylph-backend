import { MqttAdatperImp } from "_/adapters/mqtt-adapter"
import { envs } from "_/config/env"
import { COLLECTIONS } from "_/constants/colletions"
import { DatabaseRepository } from "_/repositories/database"
import { MqttService } from "_/types"
import { MeasurementMqttService } from "./mqtt-measurement-service"

export const setMqttServices = () => {
    const mqttMeasurementService = makeMqttMeasurementService()
    mqttMeasurementService.watch()

    console.log("Mqtt listeners set.")
}


const makeMqttMeasurementService =  (): MqttService => {
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const mqttMeasurement = new MqttAdatperImp(envs.mqttMetricsTopic) 
    return new MeasurementMqttService(mqttMeasurement, measurementDatabaseRepository, totemDatabaseRepository)
}