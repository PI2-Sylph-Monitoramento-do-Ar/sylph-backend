export interface DatabaseRepository {
    findAll: <T>() => Promise<T>
    findOne: <T>() => Promise<T>
    create: (data: any) => Promise<void>
    update: (data: any) => Promise<void>
    delete: () => Promise<void>
}