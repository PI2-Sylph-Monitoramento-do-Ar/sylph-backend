import { Router } from "express";
import { RouteAdapter } from "_/adapters";
import { COLLECTIONS } from "_/constants/colletions";
import { ListPrevisionsController } from "_/controllers/prevision-controllers";
import { DatabaseRepository } from "_/repositories/database";

export function setPrevisionsRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)

   const listPrevisionsController = new ListPrevisionsController(measurementDatabaseRepository)

    const routeAdapter = new RouteAdapter()

    // ROUTES
    router.get('/previsions', routeAdapter.handle(listPrevisionsController))
}