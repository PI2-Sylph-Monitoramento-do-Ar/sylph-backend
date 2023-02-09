import { HttpsAdapter } from "_/adapters/http-adapters"
import { PrevisionService } from "./prevision-service"
import { envs } from "_/config/env"

export const setPrevisionService = () => {
    makePrevisionService()

    console.log("PrevisionService created.")
}


const makePrevisionService =  (): PrevisionService => {
    const api = new  HttpsAdapter(envs.previsionServiceuRL)
    return PrevisionService.getInstance(api)
}