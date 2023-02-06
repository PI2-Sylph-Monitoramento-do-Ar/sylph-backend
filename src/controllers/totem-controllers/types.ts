import { Totem } from "_/models"

export type DeleteTotemParams = {
    totem_id: string
}

export type UpdateTotemParams = {
    totem_id: string
}

export type TotemAuthHeaders = {
    email: string 
}

export type FindTotemParams = DeleteTotemParams

export type ListTotemQuery = Partial<Totem>
