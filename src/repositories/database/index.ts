import { Collection } from "mongodb";
import { Database } from "_/config/database";
import { IDatabaseRepository, Model, UpdateConfig } from "_/types";

export class DatabaseRepository implements IDatabaseRepository {
    private databaseSingleton = Database.getInstance()
    private collection: Collection;

    constructor(collectionName: string){
        this.collection = this.databaseSingleton.getCollection(collectionName)
    }

    async findAll<T extends Model>(args?: Partial<T>): Promise<T[]>{
        const response = await this.collection.find(args, { projection: { _id: 0 }}).toArray()
        return response as unknown  as T[]
    }


    async findOne<T extends Model>(options: Partial<T>): Promise<T> {
        const response = await this.collection.findOne(options, { projection: { _id: 0 }})
        return response as unknown as T
    }


    async create<T extends Model>(data:T | T[]): Promise<void>{
        if(Array.isArray(data)){
            await this.collection.insertMany(data)
            return
        }
        await this.collection.insertOne(data)
    }

    async update<T extends Model>(id: string, data: Partial<T>, config?: UpdateConfig){
        await this.collection.updateOne({ id }, { $set: data }, {
            upsert: config?.createItNotExists ?? false
        })
    }

    async delete(id: string): Promise<void>{
        await this.collection.deleteOne({ id })
    }

}