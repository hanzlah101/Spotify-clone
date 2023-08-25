'use client'

import * as React from 'react'
import Image from 'next/image'

import { Song } from '@/types'
import { PlayButton } from './play-button'
import { useLoadImage } from '@/hooks/use-load-image'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data)

  return (
    <div
      onClick={() => onClick(data.id)}
      className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-muted-foreground/5 cursor-pointer hover:bg-muted-foreground/10 p-3 transition-colors duration-300'
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <Image
          fill
          src={imagePath!}
          alt={data.title ?? ''}
          className='object-cover'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold w-full truncate'>{data.title}</p>
        <p className='text-muted-foreground text-sm pb-4 w-full truncate'>
          By {data.author}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  )
}
