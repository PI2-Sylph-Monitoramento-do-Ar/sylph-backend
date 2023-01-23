import { MqttAdatper } from "_/adapters/mqtt-adapter";
import { mapBodyToMeasurement } from "_/helpers/map-body-to-measurement";
import { MeasurementDto } from "_/models";
import { DatabaseRepository } from "_/repositories/database";
import { MqttService } from "_/types";

export class MeasurementMqttService implements MqttService{
    constructor(
        private readonly mqttMeasurement: MqttAdatper, 
        private readonly measurementDatabaseRepository: DatabaseRepository,
        private readonly totemDatabaseRepository: DatabaseRepository
    ){}
    
    watch(){

        this.mqttMeasurement.onMessage<MeasurementDto>(async (data) => {
            const totem = await this.totemDatabaseRepository.findOne({ id: data.totem_id })
            if(!totem) {
                console.log("Totem não encontrado");
                return
            }

            this.measurementDatabaseRepository.create(mapBodyToMeasurement(data))
        })
    }
}