import { HttpRequest, HttpResponse } from "./http";

export type ControllerMethod = (httpRequest: HttpRequest) => Promise<HttpResponse>