import { AccessDeniedError } from "_/errors";
import * as httpStatus from "_/helpers/http-helpers";
import { Totem } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { DeleteTotemParams, TotemAuthHeaders } from "./types";

export class DeleteTotemController implements Controller {
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async handle(httpRequest: HttpRequest<null, TotemAuthHeaders>, httpParams: HttpRequestParams<DeleteTotemParams>): Promise<HttpResponse> {
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
}