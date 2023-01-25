import { Totem } from "_/models"

export type DeleteTotemParams = {
    totem_id: string
}
export type FindTotemParams = DeleteTotemParams

export type ListTotemQuery = Partial<Totem>