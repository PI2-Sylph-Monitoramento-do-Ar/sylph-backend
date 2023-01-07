import { HttpRequest, HttpResponse, HttpRequestParams } from "./http";

export type Controller<T = object> = Record<keyof T, ControllerMethod>
export type ControllerMethod = (httpRequest: HttpRequest, httpRequestParams?: HttpRequestParams ) => Promise<HttpResponse>