
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { Client as NotionClient } from "@notionhq/client";

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
    async signIn({ user, account }) {
      //TODO log file を書いても良さそう
      console.log("Google認証ユーザー:", user);
      // Google認証時のみNotionに登録
      if (account?.provider === "google" && user?.email && user?.name) {
        try {
          const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });
          const databaseId = process.env.NOTION_DATABASE_ID!;
          await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
              Name: {
                title: [
                  { text: { content: user.name } },
                ],
              },
              Email: {
                email: user.email,
              },
            },
          });
        } catch (e) {
          console.error("Notion登録エラー", e);
        }
      }
      return true;
    },
  },
});