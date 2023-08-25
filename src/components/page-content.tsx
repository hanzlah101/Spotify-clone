'use client'

import * as React from 'react'

import { Song } from '@/types'
import { SongItem } from './song-item'
import { useOnPlay } from '@/hooks/use-on-play'

interface PageContentProps {
  songs: Song[]
}

export const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

  if (!songs.length) {
    return <div className='mt-4 text-muted-foreground'>No songs available.</div>
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
      {songs?.map((song, index) => (
        <SongItem
          data={song}
          key={index}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  )
}
