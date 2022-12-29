
import { Totem } from "_/types"

export const mapBodyToTotem = (body: object): Totem => {
    const {mac_addres, location, is_active} = body as Totem;
    return {
        mac_addres,
        location,
        is_active
    }
}