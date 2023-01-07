export type HttpResponse<R = object> = {
    statusCode: number
    body: R
}

export type HttpRequestParams<P = object, Q = object> = {
  params: P, 
  query: Q
}

export type HttpRequest<T = object, K = object> = {
    body?: T
    headers?: K
}