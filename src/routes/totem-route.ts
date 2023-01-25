import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { adaptMiddleware } from "_/adapters/middleware-adapter";
import { COLLECTIONS } from "_/constants/colletions";
import { TotemController } from "_/controllers/totem-controller";
import { AuthMiddleware } from "_/middlewares/auth";
import { DatabaseRepository } from "_/repositories/database";

export function setTotemRoutes (router: Router){
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const totemControtroller = new TotemController(totemDatabaseRepository)

    const authMiddleware = new AuthMiddleware() 

    // ROUTES
    router.post('/totems', adaptMiddleware(authMiddleware), adaptRoute(totemControtroller.createTotem, totemControtroller))
    router.delete('/totems/:totem_id', adaptMiddleware(authMiddleware), adaptRoute(totemControtroller.deleteTotem, totemControtroller))

    router.get('/totems', adaptRoute(totemControtroller.listTotem, totemControtroller))
    router.get('/totems/:totem_id', adaptRoute(totemControtroller.findTotem, totemControtroller))
}