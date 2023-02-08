import { Measurement } from "_/models";
import { Controller, HttpRequestParams, HttpResponse, IDatabaseRepository } from "_/types";
import { GetLatestMeasurementsParams } from "./types";
import * as httpStatus from "_/helpers/http-helpers";


export class GetLatestMeasureController implements Controller {
    constructor(private readonly measurementDatabaseRepository: IDatabaseRepository){}

    async handle(_, httpRequestParams?: HttpRequestParams<GetLatestMeasurementsParams>): Promise<HttpResponse> {
        try {
            const { totem_id  } = httpRequestParams.params
        
            const measurements = await this.measurementDatabaseRepository.findAll<Measurement>({ totem_id })

            if(!measurements.length) return httpStatus.ok({})

            return httpStatus.ok(measurements[measurements.length - 1])

        } catch(error){
            console.log(error)
            return httpStatus.serverError(error)
        }
    }
}