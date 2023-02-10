import { Router } from "express";
import { RouteAdapter } from "_/adapters";
import { HttpsAdapter } from "_/adapters/http-adapters";
import { envs } from "_/config/env";
import { COLLECTIONS } from "_/constants/colletions";
import { ListPrevisionsController } from "_/controllers/prevision-controllers";
import { DatabaseRepository } from "_/repositories/database";
import { PrevisionService } from "_/services/prevision/prevision-service";

export function setPrevisionsRoutes (router: Router){
    const measurementDatabaseRepository = new DatabaseRepository(COLLECTIONS.MEASUREMENTS)
    const previsionService = new PrevisionService(new HttpsAdapter(envs.previsionServiceuRL))

   const listPrevisionsController = new ListPrevisionsController(measurementDatabaseRepository, previsionService)

    const routeAdapter = new RouteAdapter()

    // ROUTES
    router.get('/previsions', routeAdapter.handle(listPrevisionsController))
}