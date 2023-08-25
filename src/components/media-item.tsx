import * as React from 'react'
import Image from 'next/image'

import { Song } from '@/types'
import { usePlayer } from '@/hooks/use-player'
import { useLoadImage } from '@/hooks/use-load-image'

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

export const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data)
  const player = usePlayer()

  const handleClick = React.useCallback(() => {
    if (onClick) {
      return onClick(data.id)
    }

    return player.setId(data.id)
  }, [onClick, data, player])

  return (
    <div
      onClick={handleClick}
      className='flex items-center gap-x-3 cursor-pointer hover:bg-foreground/5 transition-all duration-300 w-full p-2 rounded-md'
    >
      <div className=' relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          fill
          src={imageUrl ?? ''}
          alt={data.title ?? ''}
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-foreground truncate'>{data.title}</p>
        <p className='text-muted-foreground text-sm truncate'>
          By {data.author}
        </p>
      </div>
    </div>
  )
}
