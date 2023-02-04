import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpRequestParams } from '_/types'

/* adapter to adapt the response of express to the controller we're using.
   it helps to treat errors in our application
*/


/** @TODO: 
 * This file is too similar to adaptRoute, refactor: Template method?
 */
export const adaptFileRoute = (controller: Controller) => {
  
  return async (req: Request, res: Response): Promise<void> => {
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
        res.set({
            "Content-Type": httpResponse.body.fileType,
            "Content-Disposition": `attachment; filename="${httpResponse.body.filename}"`,
        }).send(httpResponse.body.data)
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