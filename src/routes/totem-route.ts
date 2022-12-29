import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { TotemController } from "_/controllers/totem-controller";
import { DatabaseRepository } from "_/repositories/database";

export function setTotemRoutes (router: Router){
    const totemDatabaseRepository = new DatabaseRepository('totems')
    const totemControtroller = new TotemController(totemDatabaseRepository)

    // ROUTES
    router.get('/totems', adaptRoute(totemControtroller.listTotem))
    router.post('/totems', adaptRoute(totemControtroller.createTotem))
}