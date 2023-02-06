import { Totem, TotemDto } from "_/models";
import * as httpStatus from "_/helpers/http-helpers";
import { Controller, HttpRequest, HttpRequestParams, HttpResponse, IDatabaseRepository } from "_/types";
import { TotemAuthHeaders, UpdateTotemParams } from "./types";
import { mapUpdateBodyToTotem } from "_/helpers/map-body-to-totem";

export class UpdateTotemController implements Controller {
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async handle(httpRequest: HttpRequest<TotemDto, TotemAuthHeaders>, httpRequestParams?: HttpRequestParams<UpdateTotemParams>): Promise<HttpResponse>{
        try {
            const { email } = httpRequest.headers
            
            const { totem_id } = httpRequestParams.params

            if(!email) return httpStatus.unauthorized()

            const totemToUpdate = await this.totemDatabaseRepository.findOne<Totem>({ id: totem_id })

            if(totemToUpdate.email != email) return httpStatus.unauthorized()

            const totemData = mapUpdateBodyToTotem(httpRequest.body, email)
            await this.totemDatabaseRepository.update<Totem>(totem_id, totemData)

            return httpStatus.noContent()

        } catch(error){
            return httpStatus.serverError(error)

        }
    }
    
}