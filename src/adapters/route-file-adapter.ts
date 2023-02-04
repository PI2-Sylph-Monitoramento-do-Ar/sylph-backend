import { Response } from "express";
import { HttpResponse } from "_/types";
import { RouterAdapterBase } from "./router-adapter-base";

export class RouteFileAdatper extends RouterAdapterBase {
  sendSuccess(res: Response<any, Record<string, any>>, httpResponse: HttpResponse<any>) {
    res.set({
      "Content-Type": httpResponse.body.fileType,
      "Content-Disposition": `attachment; filename="${httpResponse.body.filename}"`,
    }).send(httpResponse.body.data)
  }
}