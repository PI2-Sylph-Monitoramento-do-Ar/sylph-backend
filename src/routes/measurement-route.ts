import { Router } from "express";
import { adaptFileRoute, adaptRoute, JsonToCsv } from "_/adapters";
import { COLLECTIONS } from "_/constants/colletions";
import { CreateMeasurementController, GetMeasurementCsvController, ListMeasurementController } from "_/controllers/measurement-controllers";
import { DatabaseRepository } from "_/repositories/database";

export function setMeasurementRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const jsonToCsv = new JsonToCsv()

    const createMeasurementController = new CreateMeasurementController(measurementDatabaseRepository, totemDatabaseRepository)
    const getCsvController = new GetMeasurementCsvController(measurementDatabaseRepository, jsonToCsv)
    const listMeasurementController = new ListMeasurementController(measurementDatabaseRepository)

    // ROUTES
    router.get('/measurements', adaptRoute(listMeasurementController))
    router.post('/measurements', adaptRoute(createMeasurementController))
    router.get('/measurements/csv/:totem_id', adaptFileRoute(getCsvController))
}