import { Model } from "./model"


export type UpdateConfig = { createItNotExists: boolean }
export interface IDatabaseRepository {
    findAll: <T extends Model>(options?: Partial<T>) => Promise<T[]>
    findOne: <T extends Model>(options: Partial<T>) => Promise<T>
    create: <T extends Model>(data: T | T[]) => Promise<void>
    update: <T>(id: string, data: Partial<T>, config: UpdateConfig) => Promise<void>
    delete: (id: string) => Promise<void>
}