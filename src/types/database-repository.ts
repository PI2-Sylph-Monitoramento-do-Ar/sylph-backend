import { Model } from "./schema"

export interface IDatabaseRepository {
    findAll: <T extends Model>() => Promise<T[]>
    findOne: <T extends Model>(options: Partial<T>) => Promise<T>
    create: <T extends Omit<Model, 'id'>>(data: T) => Promise<void>
    update: <T>(id: string, data: Partial<T>) => Promise<void>
    delete: (id: string) => Promise<void>
}