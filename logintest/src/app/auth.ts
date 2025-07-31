
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    LinkedIn,
  ],
  session: {
    strategy: "jwt",
    maxAge: 30, // 30s
  },
  callbacks: {
    async signIn({ user }) {
      //TODO log file を書いても良さそう
      console.log("Google認証ユーザー:", user);
      // 必要ならDBや外部サービスに記録も可能
      return true;
    },
  },
});