import { Request, Response } from 'express'
import { ControllerMethod, HttpRequest, HttpRequestParams } from '_/types'

/* adapter to adapt the response of express to the controller we're using.
   it helps to treat errors in our application
*/
export const adaptRoute = (controller: ControllerMethod) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const httpRequestParams: HttpRequestParams = {
      params: req.params, 
      query: req.query
    }

    const httpResponse = await controller(httpRequest, httpRequestParams)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      const { message, name, stack } = httpResponse.body as Error
      res.status(httpResponse.statusCode).json({
        error: {
          message,
          name,
          stack
        }
      })
    }
  }
}