import { HttpRequest, HttpRequestParams, HttpResponse } from "./http";

export interface Middleware {
    handle: (httpRequest: HttpRequest, httpParams?: HttpRequestParams) => Promise<HttpResponse> 
}