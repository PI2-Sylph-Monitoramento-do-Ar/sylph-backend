import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { Totem, TotemDto } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { DeleteTotemParams, FindTotemParams } from "./types";

export class TotemController implements Controller<TotemController>{
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async createTotem(httpRequest: HttpRequest<TotemDto>): Promise<HttpResponse>{
        try {
            await this.totemDatabaseRepository.create(mapBodyToTotem(httpRequest.body));
            return httpStatus.created();
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listTotem(_: HttpRequest): Promise<HttpResponse> {
        try {
            const totems = await this.totemDatabaseRepository.findAll();
            return httpStatus.ok(totems)
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

    async deleteTotem(_: HttpRequest, httpParams: HttpRequestParams<DeleteTotemParams>): Promise<HttpResponse> {
        try {
            const { totem_id } = httpParams.params            
            await this.totemDatabaseRepository.delete(totem_id)
            return httpStatus.noContent()
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

    async findTotem(_: HttpRequest, httpParams: HttpRequestParams<FindTotemParams>): Promise<HttpResponse> {
        try {
            const { totem_id } = httpParams.params            
            const totem = await this.totemDatabaseRepository.findOne<Totem>({ id: totem_id })
            return httpStatus.ok(totem)
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}