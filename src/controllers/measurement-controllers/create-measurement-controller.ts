import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToMeasurement } from "_/helpers/map-body-to-measurement";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository } from "_/types";
import { MeasurementDto, Totem } from "_/models"

export class CreateMeasurementController implements Controller {

    constructor(
        private readonly measurementDatabaseRepository: IDatabaseRepository,
        private readonly totemDatabaseRepository: IDatabaseRepository,
    ){}

    async handle(httpRequest: HttpRequest<MeasurementDto>): Promise<HttpResponse> {
        try {
            const { totem_id } = httpRequest.body
            const totem = await this.totemDatabaseRepository.findOne<Totem>({id: totem_id})
            if(!totem) return httpStatus.badRequest(new Error("Totem não encontrado."))

            await this.measurementDatabaseRepository.create(mapBodyToMeasurement(httpRequest.body));
            return httpStatus.created();
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}