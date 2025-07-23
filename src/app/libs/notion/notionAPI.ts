import { Client } from '@notionhq/client';
import { NotionToMarkdown } from "notion-to-md";


export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPageContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  return mdblocks;
}


interface NotionPostInfo {
  title: string;
  date: string;
  author: string
};

export async function getPageInfo(pageId: string): Promise<NotionPostInfo> {
  const response = await notion.pages.retrieve({ page_id: pageId });

  const pageInfo = response.properties

  return {
    title: pageInfo.title.title[0].plain_text,
    date: pageInfo.date.start,
    author: pageInfo.author.people[0].name
  }
}