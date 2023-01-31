import { AccessDeniedError } from "_/errors";
import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { Totem, TotemDto } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { validateFields } from "_/validation/fields-validation";
import { DeleteTotemParams, FindTotemParams, ListTotemQuery, TotemHeaders } from "./types";

export class TotemController implements Controller<TotemController>{
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async createTotem(httpRequest: HttpRequest<TotemDto, TotemHeaders>): Promise<HttpResponse>{
        try {
            const { email } = httpRequest.headers

            const requiredFields: Array<keyof TotemDto> = ["is_active", "name", "mac_address", "location"]
            const fields = Object.keys(httpRequest.body)

            const validationResponse = validateFields({ requiredFields, fields })

            if(!validationResponse.valid){
                return httpStatus.badRequest(new Error(validationResponse.message))
            }

            await this.totemDatabaseRepository.create(mapBodyToTotem(httpRequest.body, email));
            return httpStatus.created();
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listTotem(_: HttpRequest, params: HttpRequestParams<null, ListTotemQuery>): Promise<HttpResponse> {
        try {
            const { query } = params
            const totems = await this.totemDatabaseRepository.findAll(query);
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