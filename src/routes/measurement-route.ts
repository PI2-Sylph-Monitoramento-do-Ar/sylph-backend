import { Router } from "express";
import { RouteAdapter, RouteFileAdatper, JsonToCsv } from "_/adapters";
import { COLLECTIONS } from "_/constants/colletions";
import { CreateMeasurementController, GetMeasurementCsvController, ListMeasurementController } from "_/controllers/measurement-controllers";
import { GetLatestMeasureController } from "_/controllers/measurement-controllers/get-latest-measure";
import { DatabaseRepository } from "_/repositories/database";

export function setMeasurementRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const jsonToCsv = new JsonToCsv()

    const createMeasurementController = new CreateMeasurementController(measurementDatabaseRepository, totemDatabaseRepository)
    const getCsvController = new GetMeasurementCsvController(measurementDatabaseRepository, jsonToCsv)
    const listMeasurementController = new ListMeasurementController(measurementDatabaseRepository)
    const getLatestMeasurementController = new GetLatestMeasureController(measurementDatabaseRepository)

    const routeAdapter = new RouteAdapter()
    const routeFileAdapter = new RouteFileAdatper()

    // ROUTES
    router.get('/measurements', routeAdapter.handle(listMeasurementController))
    router.post('/measurements', routeAdapter.handle(createMeasurementController))
    router.get('/measurements/csv/:totem_id', routeFileAdapter.handle(getCsvController))
    router.get('/measurements/:totem_id/latest', routeAdapter.handle(getLatestMeasurementController))
}