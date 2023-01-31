
import { Totem, TotemDto } from "_/models"
import { genereateId } from "./generate-id";

export const mapBodyToTotem = (body: TotemDto, email: string): Totem => {
    const { mac_address, location, is_active, name } = body;

    return {
        name,
        id: genereateId(),
        mac_address,
        location,
        is_active, 
        email
    }
}