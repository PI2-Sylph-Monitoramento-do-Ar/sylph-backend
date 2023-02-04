import { HttpRequest, HttpRequestParams, HttpResponse } from "./http";

export interface Controller {
    handle: (httpRequest: HttpRequest, httpRequestParams?: HttpRequestParams ) => Promise<HttpResponse>
}