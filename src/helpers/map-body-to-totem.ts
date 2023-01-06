
import { Totem } from "_/models"

export const mapBodyToTotem = (body: object): Omit<Totem, '_id'> => {
    const { mac_addres, location, is_active } = body as Totem;
    
    return {
        mac_addres,
        location,
        is_active
    }
}