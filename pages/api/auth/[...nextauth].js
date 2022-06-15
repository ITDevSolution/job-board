import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

// import nodemailer from "nodemailer"
// import { html, text } from "utils/htmlEmail"

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
      // async sendVerificationRequest({
      //   identifier: email,
      //   url,
      //   provider: { server, from },
      // }) {
      //   const { host } = new URL(url)
      //   const transport = nodemailer.createTransport(server)
      //   await transport.sendMail({
      //     to: email,
      //     from,
      //     subject: `Sign in to ${host}`,
      //     text: text({ url, host }),
      //     html: html({ url, host, email }),
      //   })
      // },
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
    // signIn: "/auth/signin",
    signIn: "/login",
  },

  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      return Promise.resolve(session)
    },
    // async session({ session, token, user }) {
    //   session.user.username = session.user.name
    //     .split(" ")
    //     .join("")
    //     .toLocaleLowerCase()

    //   session.user.uid = token.sub
    //   return session
    // },
  },
})
