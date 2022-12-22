import express from 'express'

import { Database } from "_/config/database";
import { contentType, bodyparser, cors, requestInfo } from "_/middlewares"
import { envs } from "_/config/env";

export class App {
    private databaseSingleton: Database = Database.getInstance()
    public app = express()

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
        this.app.use('', (req, res) => {
            res.send("server is running!")
        })
    }
}

export const app = new App().app