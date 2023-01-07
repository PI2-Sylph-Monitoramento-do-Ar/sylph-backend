import { HttpRequest, HttpResponse, HttpRequestParams } from "./http";

export type Controller<T> = Record<keyof T, ControllerMethod>
export type ControllerMethod = (httpRequest: HttpRequest, httpRequestParams?: HttpRequestParams ) => Promise<HttpResponse>