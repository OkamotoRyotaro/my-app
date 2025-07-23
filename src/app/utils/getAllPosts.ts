import { LogGenerater } from "../logs/LogGenerater";

export const getAllPosts = async () => {
  try {
    // response is object as notion database. but response is not json Object.
    // if you want to know response structure, check the src/app/api/route.ts
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api`, { cache: "no-store" });
    const data = await response.json();
    LogGenerater(JSON.stringify(data))
    return data
  } catch (error) {
    LogGenerater(`${error}`, "ERROR")
    console.error('データの取得に失敗しました:', error);
  }
};
