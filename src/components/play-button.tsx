import { FaPlay } from 'react-icons/fa'

export const PlayButton = () => {
  return (
    <button className='transition-all opacity-0 rounded-full flex items-center justify-center bg-primary p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 duration-300'>
      <FaPlay className='text-primary-foreground' />
    </button>
  )
}
