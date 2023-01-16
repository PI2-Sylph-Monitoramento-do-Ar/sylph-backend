import { MqttAdatperImp } from "_/adapters/mqtt-adapter"
import { COLLECTIONS } from "_/constants/colletions"
import { TOPICS } from "_/constants/topics"
import { DatabaseRepository } from "_/repositories/database"
import { MqttService } from "_/types"
import { MeasurementMqttService } from "./mqtt-measurement-service"

export const setMqttServices = () => {
    const mqttMeasurementService = makeMqttMeasurementService()
    mqttMeasurementService.watch()
}


const makeMqttMeasurementService =  (): MqttService => {
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const mqttMeasurement = new MqttAdatperImp(TOPICS.MEASUREMENTS) 
    return new MeasurementMqttService(mqttMeasurement, measurementDatabaseRepository, totemDatabaseRepository)
}