import express, { Router, Express } from 'express'

import { Database } from "_/config/database";
import { contentType, bodyparser, cors, requestInfo } from "_/middlewares"
import { envs } from "_/config/env";
import { setMeasurementRoutes } from '_/routes';



export class App {
    private databaseSingleton: Database = Database.getInstance()
    public app: Express = express()

    constructor(){
        this.init()
    }

    async init(){
        await this.databaseSingleton.connect(envs.mongoUrl)
        this.setUpMiddlewares()
        this.setRoutes()
    }

    setUpMiddlewares(){
        this.app.use(cors)
        this.app.use(requestInfo)
        this.app.use(contentType)
        this.app.use(bodyparser)
    }

    setRoutes(){
        const router = Router()
        this.app.use('/api', router)
        setMeasurementRoutes(router)
    }
}

export const app = new App().app