import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      // DBから許可メールアドレスを取得
      const allowed = await prisma.allowList.findUnique({
        where: { email: user.email },
      });
      return !!allowed;
    },
  },
});