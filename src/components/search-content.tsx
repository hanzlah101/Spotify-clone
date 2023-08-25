'use client'

import * as React from 'react'

import { Song } from '@/types'
import { LikeButton } from './like-button'
import { useOnPlay } from '@/hooks/use-on-play'
import { MediaItem } from '@/components/media-item'

interface SearchContentProps {
  songs: Song[]
}

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

  if (!songs.length) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-muted-foreground'>
        No songs found.
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
      {songs?.map((song: Song) => (
        <div key={song.id} className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}
