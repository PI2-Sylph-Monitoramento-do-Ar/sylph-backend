import { ok } from "_/helpers/http-helpers";
import { DatabaseRepository } from "_/repositories/database";
import { HttpRequest, HttpResponse, ControllerMethod } from "_/types";

/** Record<keyof MeasurementController, ControllerMethods> makes sure every method in the controller class have the same params and return type */

export class MeasurementController implements Record<keyof MeasurementController, ControllerMethod> {

    constructor(
        private readonly measurementDatabaseRepository: DatabaseRepository
    ){}
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listMeasurement(httpRequest: HttpRequest): Promise<HttpResponse> {
        // this is mocked. When trully developed, it should call database respository to get the measurements
        return ok([{
            test: "hello world!"
        }])
    }
}