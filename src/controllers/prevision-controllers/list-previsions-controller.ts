import * as httpStatus from "_/helpers/http-helpers";
import { HttpRequest, HttpResponse, Controller, IDatabaseRepository, HttpRequestParams, IPrevisionService } from "_/types";
import { Measurement } from "_/models"
import { FindMeasurementQuery } from './types'
import { mapMeasurementByHours } from "_/helpers/map-measurements-by-hour";
import { getNextSixHours } from "_/helpers/get-next-six-hours";

export class ListPrevisionsController implements Controller {
    constructor(
        private readonly measurementDatabaseRepository: IDatabaseRepository,
        private readonly previsionService: IPrevisionService,
    ){}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(_: HttpRequest, httpParams: HttpRequestParams<null, FindMeasurementQuery>): Promise<HttpResponse> {
        try {
            const query = httpParams.query
            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>(query);
            const measurementByHour = mapMeasurementByHours(measurements)
            const nextSixHours = getNextSixHours()
            const previsions = []
            for(const hour in nextSixHours){
                const stringHour = hour.toString().padStart(2, '0')
                const nextMeasurement = measurementByHour[stringHour].length > 0? await this.previsionService.getPrevision(measurementByHour[stringHour]) : -1
                previsions.push(nextMeasurement)
            }
            return httpStatus.ok({previsions, nextSixHours})
        } catch(error){
            console.error(error)
            return httpStatus.serverError(error)
        }
    }
}