import { Collection } from "mongodb";
import { Database } from "_/config/database";
import { IDatabaseRepository, Model } from "_/types";

export class DatabaseRepository implements IDatabaseRepository {
    private databaseSingleton = Database.getInstance()
    private collection: Collection;

    constructor(collectionName: string){
        this.collection = this.databaseSingleton.getCollection(collectionName)
    }

    async findAll<T extends Model>(): Promise<T[]>{
        const response = await this.collection.find().toArray()
        return response  as T[]
    }


    async findOne<T extends Model>(options: Partial<T>): Promise<T> {
        const response = await this.collection.findOne(options)
        return response as unknown as T
    }


    async create<T extends Omit<Model, '_id'>>(data:T): Promise<void>{
        const response = await this.collection.insertOne(data)
        console.log({ response })
    }

    async update<T extends Omit<Model, '_id'>>(id: string, data: Partial<T>){
        await this.collection.updateOne({ _id: id }, data)
    }

    async delete(id: string): Promise<void>{
        await this.collection.deleteOne({_id: id})
    }

}