import { ServerError, UnauthorizedError } from '_/errors'
import { HttpResponse } from '_/types/http'


export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})
export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: error
})
export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const ok = <T = object>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})

export const created = (data?: object): HttpResponse => ({
  statusCode: 201,
  body: data
})


export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})