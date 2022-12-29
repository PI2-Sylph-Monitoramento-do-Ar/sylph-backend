import { ok } from "_/helpers/http-helpers";
import { DatabaseRepository } from "_/repositories/database";
import { HttpRequest, HttpResponse, ControllerMethod } from "_/types";

/** Record<keyof TotemController, ControllerMethods> makes sure every method in the controller class have the same params and return type */

export class TotemController implements Record<keyof TotemController, ControllerMethod> {

    constructor(
        private totemDatabaseRepository: DatabaseRepository = new DatabaseRepository('totems')
    ){}

    async createTotem(httpRequest: HttpRequest): Promise<HttpResponse>{
        const totem = await new DatabaseRepository('totems').create(httpRequest.body);
        return ok({});
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listTotem(httpRequest: HttpRequest): Promise<HttpResponse> {
        // this is mocked. When trully developed, it should call database respository to get the totems
        const totems = await new DatabaseRepository('totems').findAll();
        return ok({totems})
    }
}