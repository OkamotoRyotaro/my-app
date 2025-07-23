import Image from 'next/image';
import { getAllPosts } from "../utils/getAllPosts"
import Link from 'next/link';
import { fetchEventListFromPost } from '../utils/fetchEventListFromPost';

export const revalidate = 60

export default async function Events() {
  const postsProperties = await getAllPosts()
  const eventList = fetchEventListFromPost(postsProperties)
  return (
    <div className='container mx-auto'>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:w-5/6 mx-auto">
        <h1 className="text-md  md:text-xl font-bold mb-6">list</h1>
        <div className="grid gap-8 p-3 md:p-10 pt-5 md:grid-cols-2 lg:grid-cols-3">
          {eventList.map((post, index) => (
            <Link href={`/events/${post.id}`} key={index} className="border rounded-lg p-10 shadow-lg transition-shadow hover:shadow-xl">
              <h2 className="text-sm  sm:text-md  md:text-lg font-semibold mb-2">{post.title}</h2>
              <p className="mb-2 text-gray-600">{post.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
