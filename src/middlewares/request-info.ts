import { NextFunction, Request, Response } from 'express'

export function requestInfo(req: Request, res: Response, next: NextFunction) {
    console.time('Request');
    console.log(`URL: ${req.url}, method: ${req.method}`);
    next();
    console.timeEnd('Request');
}

