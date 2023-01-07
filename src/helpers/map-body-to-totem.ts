
import { Totem, TotemDto } from "_/models"
import { genereateId } from "./generate-id";

export const mapBodyToTotem = (body: TotemDto): Totem => {
    const { mac_address, location, is_active } = body as Totem;

    return {
        id: genereateId(),
        mac_address,
        location,
        is_active
    }
}