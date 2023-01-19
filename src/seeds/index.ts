import { Database } from "_/config/database"
import { envs } from "_/config/env"
import { COLLECTIONS } from "_/constants/colletions"
import { Measurement, Totem } from "_/models"
import { DatabaseRepository } from "_/repositories/database"
import { gerenerateMeasurements, totems } from "./utils"


const createTotems = async () => {
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    await totemDatabaseRepository.create<Totem>(totems)
}

const createMeasurements = async () => {
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const promisses = totems.map(async (totem) => {
        const measurements = gerenerateMeasurements(totem) 
        await measurementDatabaseRepository.create<Measurement>(measurements)
    })
    await Promise.all(promisses)
}

const seedDatabase = async () => {

    const database = Database.getInstance()
    await database.connect(envs.mongoUrl)
    await createTotems()
    await createMeasurements()
    console.log("Seeds generated!");   
}

seedDatabase()
