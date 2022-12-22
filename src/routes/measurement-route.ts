import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { MeasurementController } from "_/controllers/measurement-controller";
import { DatabaseRepository } from "_/repositories/database";

export function setMeasurementRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository('measurement')
    const measurementControtroller = new MeasurementController(measurementDatabaseRepository)

    // ROUTES
    router.get('/measurements', adaptRoute(measurementControtroller.listMeasurement))
}