import { NextResponse } from 'next/server';
import { notion } from "../libs/notion/notionAPI"

// GETメソッドのハンドラ関数
export async function GET() {
  try {
    // Notionデータベースからデータをクエリして取得
    const [articles, events] = await Promise.all([
      notion.databases.query({ database_id: process.env.NOTION_ARTICLE_DATABASE_ID }),
      notion.databases.query({ database_id: process.env.NOTION_EVENT_DATABASE_ID }),
    ])

    // データベースから取得したデータをJSONレスポンスとして返す
    return new NextResponse(JSON.stringify({ articles, events }), {
      status: 200,
    });
  } catch (error) {
    console.error('データの取得に失敗しました 0:', error);

    // エラーレスポンスを返す
    return new NextResponse(
      JSON.stringify({ error: 'データの取得に失敗しました 1' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}