import { Collection, MongoClient } from 'mongodb'

// Singleton for the database 
export class Database {
    private static instance: Database; 

    private client: MongoClient

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {} // prevents initialization with new operator outside of the class 

    public static getInstance(){ 
        if(!Database.instance){
            console.log("new instance!")
            Database.instance = new Database();
        }
        return Database.instance; // always sharing the same instance
    }

    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri)
        console.log("Successfully conected to the database!")
    }

    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    }

    getCollection (name: string): Collection{
        return this.client.db().collection(name)
    }
}

