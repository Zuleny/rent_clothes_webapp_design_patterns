
 import { Pool, QueryResult } from 'pg'
 import { config } from 'dotenv';
 
 export class Connection {
 
     private static _instance: Connection;
     private session: Pool;
 
     private constructor() {
         try {
             config();
             this.session = new Pool({
                 host: process.env.DB_HOST,
                 user: process.env.DB_USERNAME,
                 password: process.env.DB_PASSWORD,
                 database: process.env.DB_DATABASE,
                 port: Number(process.env.DB_PORT)
             });
             this.session.connect();
             console.log(`connected to database success:  ${process.env.DB_DATABASE}`);
         } catch (error) {
             console.error("Error in private contructor Connection", error);
             throw new Error("Error in Connection to database");
         }
     }
 
     public static getInstance(): Connection {
         if (!this._instance) {
             this._instance = new Connection();
         }
         return this._instance;
     }

    public async query(sqlQuery: string): Promise<QueryResult> {
        const result = await this.session.query(sqlQuery);
        return result;
    }
 }