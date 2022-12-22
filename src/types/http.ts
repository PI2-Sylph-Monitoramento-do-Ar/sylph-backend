export type HttpResponse<R = any> = {
    statusCode: number
    body: R
}
  
  export type HttpRequest<T = any, K = any> = {
    body?: T
    headers?: K
}