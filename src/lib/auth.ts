// email pass via better auth 
import {betterAuth} from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { schema } from "./db/schema";

export const  auth  = betterAuth(
    {
        appName:'Blog-App',
        secret:process.env.BETTER_AUTH_SECRET || '' ,
        baseURL:process.env.BASE_URL,
        database:drizzleAdapter(db,{
            provider:'pg',
            schema:{
                ...schema,
                user:schema.users,
                session:schema.sessions,
                account:schema.accounts,
            }
        }),    
        emailAndPassword: { 
		enabled: true,
		disableSignUp: false,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: false, // not direct signin after registration
        },
        session:{
            expiresIn:60*60*24*7,
            updateAge:60*60*24,
            cookieCache:{
                enabled:true,
                maxAge:60*5,
            },
            disableSessionRefresh:true
        },
        advanced:{
            useSecureCookies : process.env.NODE_ENV === "production",
            defaultCookieAttributes:{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
            }
                
        }
    
        
    
    }
)