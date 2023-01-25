import { AccessDeniedError } from "_/errors";
import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { Totem, TotemDto } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { DeleteTotemParams, FindTotemParams, TotemHeaders } from "./types";

export class TotemController implements Controller<TotemController>{
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async createTotem(httpRequest: HttpRequest<TotemDto, TotemHeaders>): Promise<HttpResponse>{
        try {
            console.log({ httpRequest })
            const { email } = httpRequest.headers
            await this.totemDatabaseRepository.create(mapBodyToTotem(httpRequest.body, email));
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

    async deleteTotem(httpRequest: HttpRequest<null, TotemHeaders>, httpParams: HttpRequestParams<DeleteTotemParams>): Promise<HttpResponse> {
        try {
            const { totem_id } = httpParams.params  
            const { email } = httpRequest.headers   

            const totem = await this.totemDatabaseRepository.findOne<Totem>({id: totem_id})
            
            if(totem.email !== email) 
                return httpStatus.forbidden(new AccessDeniedError())
        
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