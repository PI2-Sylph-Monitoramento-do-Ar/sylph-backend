import * as httpStatus from "_/helpers/http-helpers";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams, IPrevisionService } from "_/types";
import { Measurement } from "_/models"
import { FindMeasurementQuery } from './types'
import { PrevisionService } from "_/services/prevision/prevision-service";
import { mapMeasurementByHours } from "_/helpers/map-measurements-by-hour";
import { getNextSixHours } from "_/helpers/get-next-six-hours";
import { getMeasurementsWithPrevision } from "_/helpers/get-measurements-with-prevision";

export class ListMeasurementController implements Controller {
    constructor(
        private readonly measurementDatabaseRepository: IDatabaseRepository,
    ){}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(_: HttpRequest, httpParams: HttpRequestParams<null, FindMeasurementQuery>): Promise<HttpResponse> {
        try {
            const query = httpParams.query
            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>(query);
            return httpStatus.ok(await getMeasurementsWithPrevision(measurements))
        } catch(error){
            return httpStatus.serverError(error)
        }
    }
}