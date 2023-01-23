import mqtt from "mqtt"
import { envs } from "_/config/env"

export interface MqttAdatper {
    publish: <T>(data: T) => void
    onMessage: <T>(cb: (data: T) => void) => void
}

export class MqttAdatperImp implements MqttAdatper {

    private client: mqtt.MqttClient = mqtt.connect({
        host: envs.mqttHost,
        port: envs.mqttPort,
        protocol: envs.mqttProtocol,
        username: envs.mqttUsername,
        password: envs.mqttPassword,
    })

    constructor(private readonly topic: string){
        this.init()
    }

    private init(){
        this.client.subscribe(this.topic, (e) => {
            if(e){
                 console.error(`Could not subscribe to topic: ${this.topic}`, e)
                 return
            }
            console.log(`Subscribed to topic: ${this.topic}`)            
        })
    }

    publish<T>(data: T) {
        this.client.publish(this.topic, JSON.stringify(data), (e) => {
            if(e){ 
                console.error(`Message not sent in topic: ${this.topic}`, e)
                return
            }
            console.log(`Message send to topic: ${this.topic}`) 
        })
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