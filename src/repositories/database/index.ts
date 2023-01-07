import { Collection } from "mongodb";
import { Database } from "_/config/database";
import { IDatabaseRepository, Model } from "_/types";
import { isObjectEmpty } from "_/utils/is-object-empty";

export class DatabaseRepository implements IDatabaseRepository {
    private databaseSingleton = Database.getInstance()
    private collection: Collection;

    constructor(collectionName: string){
        this.collection = this.databaseSingleton.getCollection(collectionName)
    }

    async findAll<T extends Model>(args?: Partial<T>): Promise<T[]>{
        if(isObjectEmpty(args)) args = null
        const response = await this.collection.find(args).toArray()
        return response as unknown  as T[]
    }


    async findOne<T extends Model>(options: Partial<T>): Promise<T> {
        const response = await this.collection.findOne(options)
        return response as unknown as T
    }


    async create<T extends Model>(data:T): Promise<void>{
        await this.collection.insertOne(data)
    }

    async update<T extends Model>(id: string, data: Partial<T>){
        await this.collection.updateOne({ id }, data)
    }

    async delete(id: string): Promise<void>{
        await this.collection.deleteOne({ id })
    }

}