
import {pgTable, varchar , timestamp,boolean, text} from 'drizzle-orm/pg-core'
import { userAgent } from 'next/server'


export const users = pgTable('users',{  
        id : varchar('id', {length:255}).primaryKey(),
        name: varchar('name', {length:255}).notNull(),
        email: varchar('email', {length:255}).notNull().unique(),
        emailVerified: boolean('email_Verified').default(false),
        createdAt:timestamp('created_at').defaultNow().notNull(),
        updatedAt:timestamp('updated_at').defaultNow().notNull(),

    }
)

export const session= pgTable(
    'session',
    {
    id :varchar('id',{length:255}).primaryKey(),
    userId:varchar('user_id',{length:255}).references(()=>users.id).notNull(),
    token:varchar('token',{length:255}),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: varchar('ip_address',{length:255}).notNull(),
    userAgent:text('user_agent'),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').defaultNow().notNull()
    }
)