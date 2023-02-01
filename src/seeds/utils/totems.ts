import { genereateId } from "_/helpers/generate-id"
import { Totem } from "_/models"

const totem1_data = {
    name: "Totem 1",
    email: "test@test.com",
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0138479, longitude:  -48.0825750 }, 
    mac_address: "mac_address_1"
}
const totem2_data = {
    name: "Totem 2",
    email: "test3@test.com",
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0238479, longitude:  -48.0925750 }, 
    mac_address: "mac_address_1"
}
const totem3_data = {
    name: "Totem 3",
    email: "test3@test.com",
    id: genereateId(), 
    is_active: true, 
    location: { latitude: -16.0338479, longitude:  -48.0525750 }, 
    mac_address: "mac_address_1"
}

export const totems: Totem[] = [totem1_data, totem2_data, totem3_data]