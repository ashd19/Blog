// email pass via better auth 
import {betterAuth} from "better-auth";

export const  auth  = betterAuth(
    {
        appName:'Blog-App',
        secret:process.env.BETTER_AUTH_SECRET || '' ,
        baseURL:process.env.BASE_URL,
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