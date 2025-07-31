import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [
          {
            text: { content: name },
          },
        ],
      },
      Email: {
        email: email,
      },
    },
  });

  return NextResponse.json({ ok: true });
}
