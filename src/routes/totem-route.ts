import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { COLLECTIONS } from "_/constants/colletions";
import { TotemController } from "_/controllers/totem-controller";
import { DatabaseRepository } from "_/repositories/database";

export function setTotemRoutes (router: Router){
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)
    const totemControtroller = new TotemController(totemDatabaseRepository)

    // ROUTES
    router.get('/totems', adaptRoute(totemControtroller.listTotem.bind(totemControtroller)))
    router.post('/totems', adaptRoute(totemControtroller.createTotem.bind(totemControtroller)))
}