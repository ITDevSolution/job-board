import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "lib/prisma"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    masAge: 30 * 24 * 60 * 60, // 30 days
  },

  debug: true,
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      return Promise.resolve(session)
    },
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    },
  },
})
