import * as httpStatus from "_/helpers/http-helpers";
import { Totem } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import {  FindTotemParams } from "./types";

export class FindTotemController implements Controller {
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async handle(_: HttpRequest, httpParams: HttpRequestParams<FindTotemParams>): Promise<HttpResponse> {
        try {
            const { totem_id } = httpParams.params            
            const totem = await this.totemDatabaseRepository.findOne<Totem>({ id: totem_id })
            return httpStatus.ok(totem)
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}