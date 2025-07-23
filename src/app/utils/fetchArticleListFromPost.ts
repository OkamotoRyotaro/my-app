import { LogGenerater } from "../logs/LogGenerater"

interface ArticleProperties {
  id: string,
  title: string,
  date: string,
  url: string,
  author: string
}

export const fetchArticleListFromPost = (data: any): ArticleProperties[] => {
  LogGenerater("To fetch start from Article database")
  try {
    const ArticleList: ArticleProperties[] = data.articles.results.map((post: any) => ({
      id: post.id,
      title: post.properties.title.title[0]?.plain_text,
      date: post.properties.date.date.start,
      url: post.url,
      author: post.properties.author.people[0].name
    }))
    LogGenerater(JSON.stringify(ArticleList))
    return ArticleList;
  } catch (erroe) {
    LogGenerater(data, "ERROR")
    return []
  }
}