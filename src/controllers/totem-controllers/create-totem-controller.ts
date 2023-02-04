import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { TotemDto } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository } from "_/types";
import { validateFields } from "_/validation/fields-validation";
import {  TotemHeaders } from "./types";

export class CreateTotemController implements Controller{
    
    constructor(private readonly totemDatabaseRepository: IDatabaseRepository){}

    async handle(httpRequest: HttpRequest<TotemDto, TotemHeaders>): Promise<HttpResponse>{
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
}