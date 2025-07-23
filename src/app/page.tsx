import Blog from './blog/page';
import Events from './events/page';

export const revalidate = 60

export default async function Home() {
  return (
    <div className='container mx-auto'>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:w-5/6 mx-auto">
        <Blog />
        <Events />
      </main>
    </div>
  )
}
