import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { TotemDto } from "_/models";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository } from "_/types";

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
}