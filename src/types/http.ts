export type HttpResponse<R = object> = {
    statusCode: number
    body: R
}
  
  export type HttpRequest<T = object, K = object> = {
    body?: T
    headers?: K
}