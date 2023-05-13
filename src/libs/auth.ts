import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"
import { fetchRedis } from "@/helper/redis";

function getGoogleCredentials(){
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if(!clientId || clientId.length === 0){
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if(!clientSecret || clientSecret.length === 0){
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }   
    return {clientId, clientSecret}
}
   


export const authOptions: NextAuthOptions = {
    adapter:UpstashRedisAdapter(db),
    session: {
        strategy:"jwt"
    },
    pages:{
        signIn: '/login'
    },
    providers: [
        // OAuth authentication providers
      
        GoogleProvider({
          clientId: "753828891952-4nfoqb1tgslraqv54vl4u6smr8b6cni6.apps.googleusercontent.com",
          clientSecret: "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"
        })
       
      
      ],
      callbacks:{
        async jwt({token,user}){
            const dbUserResult = await fetchRedis('get',`user:${token.id}` ) as string | null
            if(!dbUserResult){
                token.id = user!.id
                return token
            }
            const dbUser = JSON.parse(dbUserResult) as User

            return{
                id: dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                picture:dbUser.image
            }
        },
        async session({session, token }){
            if(token){
                session.user.id =token.id
                session.user.name =token.name
                session.user.email =token.email
                session.user.image =token.picture
            }
            return session;
        }
        ,
        redirect(){
            return '/dashboard'
        }
      },
}