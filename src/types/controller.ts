import { HttpRequest, HttpResponse } from "./http";

export type Controller<T> = Record<keyof T, ControllerMethod>
export type ControllerMethod = (httpRequest: HttpRequest) => Promise<HttpResponse>