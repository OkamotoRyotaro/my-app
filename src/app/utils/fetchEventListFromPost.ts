import { LogGenerater } from "../logs/LogGenerater"

interface EventProperties {
  id: string,
  title: string,
  date: string,
  url: string,
  author: string
}

export const fetchEventListFromPost = (data: any): EventProperties[] => {
  LogGenerater("To fetch start from Event database")
  try {
    const EventList: EventProperties[] = data.events.results.map((post: any) => ({
      id: post.id,
      name: post.properties.name.title[0]?.plain_text,
      date: post.properties.date.date.start,
      fee: post.properties.fee.rich_text[0]?.plain_text,
    }))
    LogGenerater(JSON.stringify(EventList))
    return EventList;
  } catch (erroe) {
    LogGenerater(data, "ERROR")
    return []
  }
}