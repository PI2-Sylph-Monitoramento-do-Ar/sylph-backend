import { Response } from "express";
import { HttpResponse } from "_/types";
import { RouterAdapterBase } from "./router-adapter-base";

export class RouteAdapter extends RouterAdapterBase {
  sendSuccess(res: Response, httpResponse: HttpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body)
  } 
}