import { Controller, HttpRequest, HttpRequestParams, HttpResponse } from '_/types'
import { Request, Response } from 'express'



export abstract class RouterAdapterBase {
    handle(controller: Controller){
      return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            headers: req.headers
          }
          
          const httpRequestParams: HttpRequestParams = {
            params: req.params, 
            query: req.query
          }

          const httpResponse = await controller.handle(httpRequest, httpRequestParams)

          if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            this.sendSuccess(res, httpResponse)
            return
          } 
          this.sendError(res, httpResponse)
    }
  }

    abstract sendSuccess(res: Response, httpResponse: HttpResponse);

    private sendError(res: Response, httpResponse: HttpResponse){
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