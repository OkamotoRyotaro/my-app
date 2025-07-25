import Image from 'next/image';
import { getAllPosts } from "../utils/getAllPosts"
import Link from 'next/link';
import { fetchArticleListFromPost } from '../utils/fetchArticleListFromPost';
import { fetchEventListFromPost } from '../utils/fetchEventListFromPost';

export const revalidate = 60

export default async function Blog() {
  const postsProperties = await getAllPosts()
  const articleList = fetchArticleListFromPost(postsProperties)
  const eventList = fetchEventListFromPost(postsProperties)
  return (
    <div className='container mx-auto'>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:w-5/6 mx-auto">
        <h1 className="text-md  md:text-xl font-bold mb-6">list</h1>
        <div className="grid gap-8 p-3 md:p-10 pt-5 md:grid-cols-2 lg:grid-cols-3">
          {articleList.map((post, index) => (
            <Link href={`/blog/${post.id}`} key={index} className="border rounded-lg p-10 shadow-lg transition-shadow hover:shadow-xl">
              <h2 className="text-sm  sm:text-md  md:text-lg font-semibold mb-2">{post.title}</h2>
              <p className="mb-2 text-gray-600">{post.date}</p>
              {/* <div className="mb-4">
                <div className='flex flex-wrap gap-2' >
                  {post.types.map((type, typeIndex) => (
                    <span key={typeIndex} className="mr-2 bg-gray-800 px-2 py-1 rounded-2xl text-xs hidden sm:block text-white">{type}</span>
                  ))}
                </div>
              </div> */}
              {/* <div className="mb-4">
                {post.files.map((file, fileIndex) => (
                  <Image
                    key={fileIndex}
                    src={file}
                    alt="Post image"
                    width={960}
                    height={540}
                    className="w-full mb-2" />
                ))}
              </div> */}
              <p>author: {post.author}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
