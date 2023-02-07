
import { Totem, TotemDto } from "_/models"
import { genereateId } from "./generate-id";
import _ from "lodash";

export const mapBodyToTotem = (body: TotemDto, email: string): Totem => {
    const { mac_address, location, is_active, name, id } = body;
    return {
        name,
        id: id ?? genereateId(),
        mac_address,
        location,
        is_active, 
        email
    }
}

export const mapUpdateBodyToTotem = (body: Partial<TotemDto>, email: string): Partial<Totem> => {
    const { mac_address, location, is_active, name } = body;
    const totem =  {
        name,
        mac_address,
        location,
        is_active, 
        email
    }

    return _.omitBy(totem, _.isNil)
}