import admin, { ServiceAccount } from "firebase-admin"

import serviceAccount from "../../sylph-cert.json"

export const initFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount)
    })
}
