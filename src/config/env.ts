export const envs =  {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean_node-api',
    port: process.env.PORT || 5050,
    mqttUrl: process.env.MQTT_URI, 
    mqttClientId: process.env.MQTT_CLIENT_ID
  }