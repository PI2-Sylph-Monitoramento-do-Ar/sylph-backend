import { MqttAdatper } from "_/adapters/mqtt-adapter";
import { mapMqttToMeasurement } from "_/helpers/map-mqtt-to-measurement";
import { Measurement, MeasurementMqttDTO } from "_/models";
import { IDatabaseRepository, MqttService } from "_/types";

export class MeasurementMqttService implements MqttService{
    constructor(
        private readonly mqttMeasurement: MqttAdatper, 
        private readonly measurementDatabaseRepository: IDatabaseRepository,
        private readonly totemDatabaseRepository: IDatabaseRepository
    ){}
    
    async watch(){
        this.mqttMeasurement.onMessage<MeasurementMqttDTO>(async (data) => {
            const measurement = mapMqttToMeasurement(data)

            const totem = await this.totemDatabaseRepository.findOne({ id: measurement.totem_id })
            if(!totem) {
                console.log("Totem not found.", measurement.totem_id);
                return
            }
            await this.measurementDatabaseRepository.update<Measurement>(measurement.id, measurement, { createItNotExists: true })
            console.log("measurement added.")
        })        
    }
}