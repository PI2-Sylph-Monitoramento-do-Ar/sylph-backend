import { Router } from "express";
import { RouteAdapter } from "_/adapters";
import { MiddlewareAdapter } from "_/adapters/middleware-adapter";
import { COLLECTIONS } from "_/constants/colletions";
import { CreateTotemController, DeleteTotemController, FindTotemController, ListTotemController } from "_/controllers/totem-controllers";
import { AuthMiddleware } from "_/middlewares/auth";
import { DatabaseRepository } from "_/repositories/database";

export function setTotemRoutes (router: Router){
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)

    const createTotemController = new CreateTotemController(totemDatabaseRepository)
    const deleteTotemController = new DeleteTotemController(totemDatabaseRepository)
    const findTotemController = new FindTotemController(totemDatabaseRepository)
    const listTotemController = new ListTotemController(totemDatabaseRepository)

    const authMiddleware = new AuthMiddleware()
    const middlewareAdapter = new MiddlewareAdapter()
    const routeAdapter = new RouteAdapter()


    // ROUTES
    router.post('/totems', routeAdapter.handle(createTotemController))
    router.delete('/totems/:totem_id', middlewareAdapter.handle(authMiddleware) , routeAdapter.handle(deleteTotemController))
    router.get('/totems', routeAdapter.handle(listTotemController))
    router.get('/totems/:totem_id', routeAdapter.handle(findTotemController))
}