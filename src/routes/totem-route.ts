import { Router } from "express";
import { adaptRoute } from "_/adapters";
import { adaptMiddleware } from "_/adapters/middleware-adapter";
import { COLLECTIONS } from "_/constants/colletions";
import { CreateTotemController, DeleteTotemController, FindTotemController, ListTotemController } from "_/controllers/totem-controllers";
import { AuthMiddleware } from "_/middlewares/auth";
import { DatabaseRepository } from "_/repositories/database";

export function setTotemRoutes (router: Router){
    const totemDatabaseRepository = new DatabaseRepository(COLLECTIONS.TOTEMS)

    const createTotemControtroller = new CreateTotemController(totemDatabaseRepository)
    const deleteTotemControtroller = new DeleteTotemController(totemDatabaseRepository)
    const findTotemControtroller = new FindTotemController(totemDatabaseRepository)
    const ListtotemControtroller = new ListTotemController(totemDatabaseRepository)

    const authMiddleware = new AuthMiddleware() 

    // ROUTES
    router.post('/totems', adaptRoute(createTotemControtroller))
    router.delete('/totems/:totem_id', adaptMiddleware(authMiddleware), adaptRoute(deleteTotemControtroller))

    router.get('/totems', adaptRoute(ListtotemControtroller))
    router.get('/totems/:totem_id', adaptRoute(findTotemControtroller))
}