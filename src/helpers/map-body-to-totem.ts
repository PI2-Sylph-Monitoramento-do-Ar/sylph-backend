
import { Totem, TotemDto } from "_/models"
import { genereateId } from "./generate-id";

export const mapBodyToTotem = (body: TotemDto, email: string): Totem => {
    const { mac_address, location, is_active } = body;

    return {
        id: genereateId(),
        mac_address,
        location,
        is_active, 
        email
    }
}