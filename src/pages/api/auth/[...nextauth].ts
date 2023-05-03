import { userServerRepository } from "@/infrastructure/repositories";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { config } from "@/config/config";
import { userService } from "@/domain/services";
import { User } from "@/infrastructure/database/schemas";
import { User as UserModel } from "@/domain/models";

const service = userService(userServerRepository(User));

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.googleClientID,
      clientSecret: config.googleClientSecret,
    }),
  ],

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // 1d
  },

  callbacks: {
    async jwt({ token, account, user }) {

      if (!account) return token;

      token.accessToken = account.access_token;

      if (account?.type === 'oauth') {
        token.user = await service.register(user.email || '', user.name || '')
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      session.user = token.user as UserModel;

      return session;
    }
  },

  pages: {
    signIn: '/auth/login'
  }
});