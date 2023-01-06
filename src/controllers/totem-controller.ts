import { ok, created } from "_/helpers/http-helpers";
import { mapBodyToTotem } from "_/helpers/map-body-to-totem";
import { DatabaseRepository } from "_/repositories/database";
import { HttpRequest, HttpResponse, Controller } from "_/types";

/** Record<keyof TotemController, ControllerMethods> makes sure every method in the controller class have the same params and return type */

export class TotemController implements Controller<TotemController>{
    private readonly totemDatabaseRepository: DatabaseRepository

    constructor(_totemDatabaseRepository: DatabaseRepository){
        this.totemDatabaseRepository = _totemDatabaseRepository
    }

    async createTotem(httpRequest: HttpRequest): Promise<HttpResponse>{

        await this.totemDatabaseRepository.create(mapBodyToTotem(httpRequest.body));
        return created();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async listTotem(httpRequest: HttpRequest): Promise<HttpResponse> {
        const totems = await this.totemDatabaseRepository.findAll();
        return ok(totems)
    }
}