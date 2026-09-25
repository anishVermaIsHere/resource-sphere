
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import AppConfig from "./config/app.config"


const { oAuth, authSecret } = AppConfig;
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({ 
     clientId: oAuth.clientId,
      clientSecret: oAuth.clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },

  })],
  secret: authSecret,
  // adapter: PrismaAdapter(prisma),
  pages: {
    verifyRequest: '/verify-request'
  }
})