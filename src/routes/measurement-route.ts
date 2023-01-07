import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { COLLECTIONS } from "_/constants/colletions";
import { MeasurementController } from "_/controllers/measurement-controller";
import { DatabaseRepository } from "_/repositories/database";

export function setMeasurementRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)

    const measurementControtroller = new MeasurementController(measurementDatabaseRepository, totemDatabaseRepository)

    // ROUTES
    router.get('/measurements', adaptRoute(measurementControtroller.listMeasurement, measurementControtroller))
    router.post('/measurements', adaptRoute(measurementControtroller.createMeasurement, measurementControtroller))
}