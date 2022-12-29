import { ok } from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { DatabaseRepository } from "_/repositories/database";
import { HttpRequest, HttpResponse, ControllerMethod } from "_/types";

/** Record<keyof TotemController, ControllerMethods> makes sure every method in the controller class have the same params and return type */

export class TotemController implements Record<keyof TotemController, ControllerMethod> {

    constructor(
        private readonly totemDatabaseRepository: DatabaseRepository
    ){}

    async createTotem(httpRequest: HttpRequest): Promise<HttpResponse>{
        const totem = await new DatabaseRepository('totems').create(mapBodyToTotem(httpRequest.body));
        return ok({
            msg: 'totem was created'
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listTotem(httpRequest: HttpRequest): Promise<HttpResponse> {
        const totems = await new DatabaseRepository('totems').findAll();
        return ok({totems})
    }
}