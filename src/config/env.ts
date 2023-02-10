import z from "zod"

const envSchema = z.object({
  MONGO_URL: z.string(),
  PORT: z.string().regex(/(\d)+/g),
  MQTT_HOST: z.string(),
  MQTT_PORT: z.string().regex(/(\d)+/g),
  MQTT_PROTOCOL: z.string().regex(/(mqtt|mqtts)/g),
  MQTT_USERNAME: z.string(),
  MQTT_PASSWORD: z.string(),
  MQTT_METRICS_TOPIC: z.string(),
  PREVISION_SERVICE_URL: z.string()
})

const parsedEnv = envSchema.parse(process.env)

type MqttProtocol = "mqtt" | "mqtts"
export const envs =  {
    mongoUrl: parsedEnv.MONGO_URL,
    port: Number(parsedEnv.PORT),
    mqttHost: parsedEnv.MQTT_HOST,
    mqttPort: Number(parsedEnv.MQTT_PORT),
    mqttProtocol: parsedEnv.MQTT_PROTOCOL as MqttProtocol,
    mqttUsername: parsedEnv.MQTT_USERNAME,
    mqttPassword: parsedEnv.MQTT_PASSWORD,
    mqttMetricsTopic: parsedEnv.MQTT_METRICS_TOPIC,
    previsionServiceuRL: parsedEnv.PREVISION_SERVICE_URL
  }
