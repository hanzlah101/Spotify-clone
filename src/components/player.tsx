'use client'

import * as React from 'react'

import { usePlayer } from '@/hooks/use-player'
import { PlayerContent } from './player-content'
import { useLoadSongUrl } from '@/hooks/use-load-song-url'
import { useGetSongById } from '@/hooks/use-get-song-by-id'

export const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)
  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className='fixed bottom-0 left-0 bg-background w-full py-2 z-30 px-4'>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
