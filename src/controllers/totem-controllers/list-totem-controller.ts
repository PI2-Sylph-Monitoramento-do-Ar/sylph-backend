import * as httpStatus from "_/helpers/http-helpers";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { ListTotemQuery } from "./types";

export class ListTotemController implements Controller {
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(_: HttpRequest, params: HttpRequestParams<null, ListTotemQuery>): Promise<HttpResponse> {
        try {
            const { query } = params
            const totems = await this.totemDatabaseRepository.findAll(query);
            return httpStatus.ok(totems)
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

 
}