import { forbidden, ok, unauthorized } from "_/helpers/http-helpers";
import { HttpRequest, HttpResponse } from "_/types";
import { Middleware } from "_/types/middleware";
import admin from "firebase-admin"
import { AccessDeniedError } from "_/errors";

type AuthHeaders = { authorization: string }

export class AuthMiddleware implements Middleware {
   async handle(httpRequest: HttpRequest<null, AuthHeaders>): Promise<HttpResponse> {
        try {
            
            const bearerToken = httpRequest.headers?.authorization
            if(!bearerToken) return unauthorized()
            
            const token = bearerToken.split(' ')[1]

            const { email } = await admin.auth().verifyIdToken(token)

            return ok({ email })

        } catch(error){
            console.error(error)
            return forbidden(new AccessDeniedError())
        }
    }
}