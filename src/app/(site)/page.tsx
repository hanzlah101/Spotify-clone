import { Header } from '@/components/header'
import { getSongs } from '@/actions/get-songs'
import { ListItem } from '@/components/list-item'
import { PageContent } from '@/components/page-content'

export const revalidate = 0

const HomePage = async () => {
  const songs = await getSongs()

  return (
    <main className='bg-secondary rounded-lg h-full overflow-y-auto overflow-x-hidden lg:mr-2 lg:mx-0 mx-2'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-foreground text-3xl font-semibold'>
            Welcome Back!
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              href='/liked'
              name='Liked Songs'
              image='/images/liked.png'
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 pb-7 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-foreground text-2xl font-semibold'>
            Newest Songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </main>
  )
}

export default HomePage
