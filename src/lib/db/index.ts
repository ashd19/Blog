import {Pool} from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/singlestore/driver';
const pool  = new Pool(
    {
        connectionString:process.env.DATABASE_URL,
        ssl:process.env.NODE_ENV ==='production' ? {
            rejectUnauthorized:false,

        }:false,
        max:10
    }
)

export const db = drizzle(pool,{schema})

export async function getClient(){
    const client = await pool.connect();
    return client;
}      