import * as httpStatus from "_/helpers/http-helpers";
import { mapBodyToMeasurement } from "_/helpers/map-body-to-measurement";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { Measurement, MeasurementDto, Totem } from "_/models"
import { FindMeasurementQuery, GetCsvParams } from './types'
import { JsonToCsvAdapter } from "_/adapters";
import { File } from "_/types"

export class MeasurementController implements Controller<MeasurementController> {

    constructor(
        private readonly measurementDatabaseRepository: IDatabaseRepository,
        private readonly totemDatabaseRepository: IDatabaseRepository,
        private readonly jsonToCsv: JsonToCsvAdapter
    ){}

    async createMeasurement(httpRequest: HttpRequest<MeasurementDto>): Promise<HttpResponse> {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listMeasurement(_: HttpRequest, httpParams: HttpRequestParams<null, FindMeasurementQuery>): Promise<HttpResponse> {
        try {
            const query = httpParams.query
            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>(query);
            return httpStatus.ok(measurements)
        } catch(error){
            return httpStatus.serverError(error)
        }
    }

    async getCsv(_: HttpRequest, httpParams: HttpRequestParams<GetCsvParams>): Promise<HttpResponse<File | Error>>  {
        try {
            const { totem_id } = httpParams.params

            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>({ totem_id });
            const csvData = this.jsonToCsv.convert(measurements)

            return httpStatus.ok<File>({data: csvData, filename: "measurements.csv"})
            
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}