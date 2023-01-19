import { genereateId } from "_/helpers/generate-id"
import { Totem } from "_/models"

const totem1_data = {
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0138479, longitute:  -48.0825750 }, 
    mac_address: "mac_address_1"
}
const totem2_data = {
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0238479, longitute:  -48.0925750 }, 
    mac_address: "mac_address_1"
}
const totem3_data = {
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0338479, longitute:  -48.0525750 }, 
    mac_address: "mac_address_1"
}

export const totems: Totem[] = [totem1_data, totem2_data, totem3_data]