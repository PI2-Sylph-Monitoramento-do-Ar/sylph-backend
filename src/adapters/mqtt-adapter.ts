import mqtt from "mqtt"

export interface MqttAdatper {
    publish: <T>(data: T) => void
    onMessage: <T>(cb: (data: T) => void) => void
}

export class MqttAdatperImp implements MqttAdatper {

    private client: mqtt.MqttClient = mqtt.connect(process.env.MQTT_URI, {
        clientId: process.env.MQTT_CLIENT_ID
    })

    constructor(private readonly topic: string){
        this.init()
    }

    private init(){
        this.client.subscribe(this.topic)
    }

    publish<T>(data: T) {
        this.client.publish(this.topic, JSON.stringify(data))
    }

    onMessage<T>(cb: (data: T) => void){
        this.client.on('message', (topic, message) => {
            if(topic === this.topic){
                const data  = JSON.parse(message.toString()) as T
                cb(data)
            }
        })
    }
}