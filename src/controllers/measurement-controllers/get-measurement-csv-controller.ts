import * as httpStatus from "_/helpers/http-helpers";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams } from "_/types";
import { Measurement  } from "_/models"
import { GetCsvParams } from './types'
import { JsonToCsvAdapter } from "_/adapters";
import { FileResponse } from "_/types"

export class GetMeasurementCsvController implements Controller {

    constructor(
        private readonly measurementDatabaseRepository: IDatabaseRepository,
        private readonly jsonToCsv: JsonToCsvAdapter
    ){}

    async handle(_: HttpRequest, httpParams: HttpRequestParams<GetCsvParams>): Promise<HttpResponse<FileResponse | Error>>  {
        try {
            const { totem_id } = httpParams.params

            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>({ totem_id });
            const csvData = this.jsonToCsv.convert(measurements)

            return httpStatus.ok<FileResponse>({data: csvData, filename: "measurements.csv"})
            
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}