import { NextFunction, Response, Request } from "express"
import { HttpRequest } from "_/types"
import { Middleware } from "_/types/middleware"

export class MiddlewareAdapter {
  handle(middleware: Middleware){
    return async (req: Request, res: Response, next: NextFunction) => {
      const httpRequest: HttpRequest = {
        headers: req.headers
      }
      const httpResponse = await middleware.handle(httpRequest)
      
      if (httpResponse.statusCode === 200) {
        Object.assign(req.headers, httpResponse.body)
        next()
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body
        })
      }
    }
  }
}
