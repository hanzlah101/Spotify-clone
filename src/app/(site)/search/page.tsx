import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { SearchContent } from '@/components/search-content'
import { getSongsByTitle } from '@/actions/get-songs-by-title'

export const revalidate = 0

interface SearchProps {
  searchParams: { q: string }
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.q)

  return (
    <div className=' bg-secondary rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-secondary'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-foreground text-3xl font-semibold'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  )
}

export default SearchPage
