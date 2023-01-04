import { ok, created, badRequest } from "_/helpers/http-helpers";
import { mapBodyToMeasurement } from "_/helpers/map-body-to-measurement";
import { DatabaseRepository } from "_/repositories/database";
import { HttpRequest, HttpResponse, ControllerMethod, Measurement, MeasurementDto, Totem } from "_/types";

/** Record<keyof MeasurementController, ControllerMethods> makes sure every method in the controller class have the same params and return type */

export class MeasurementController implements Record<keyof MeasurementController, ControllerMethod> {

    constructor(
        private readonly measurementDatabaseRepository: DatabaseRepository,
        private readonly totemDatabaseRepository: DatabaseRepository,
    ){}

    async createMeasurement(httpRequest: HttpRequest<MeasurementDto>): Promise<HttpResponse> {
        // find para checar id do tottem
        const { totem_id } = httpRequest.body
        const totem = await this.totemDatabaseRepository.findOne<Totem>({_id: totem_id })
        if(!totem) return badRequest(new Error("Totem não encontrado."))

        await this.measurementDatabaseRepository.create(mapBodyToMeasurement(httpRequest.body));
        return created();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listMeasurement(httpRequest: HttpRequest): Promise<HttpResponse> {
        const measurements = await new DatabaseRepository('measurements').findAll();
        return ok({measurements})
    }
}