'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { Song } from '@/types'
import { useUser } from '@/hooks/use-user'
import { useOnPlay } from '@/hooks/use-on-play'
import { MediaItem } from '@/components/media-item'
import { LikeButton } from '@/components/like-button'

interface LikedContentProps {
  songs: Song[]
}

export const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const { isLoading, user } = useUser()
  const router = useRouter()
  const onPlay = useOnPlay(songs)

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  if (!songs.length) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-muted-foreground'>
        No liked songs.
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      {songs?.map((song: any) => (
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
