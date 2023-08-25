import * as React from 'react'
import useSound from 'use-sound'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { BsFillSkipStartFill, BsSkipEndFill } from 'react-icons/bs'

import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
} from 'react-icons/im'

import { Song } from '@/types'
import { MediaItem } from './media-item'
import { LikeButton } from './like-button'
import { usePlayer } from '@/hooks/use-player'
import { Slider } from '@/components/ui/slider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

export const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
}) => {
  const player = usePlayer()
  const [volume, setVolume] = React.useState(1)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill

  const VolumeIcon =
    volume === 0
      ? ImVolumeMute2
      : volume > 0 && volume < 0.5
      ? ImVolumeLow
      : volume >= 0.9
      ? ImVolumeHigh
      : ImVolumeMedium

  const onPlayNext = React.useCallback(() => {
    if (!player.ids.length) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }, [player])

  const onPlayPrevious = React.useCallback(() => {
    if (!player.ids.length) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }, [player])

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  React.useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = React.useCallback(() => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }, [play, pause, isPlaying])

  const toggleMute = React.useCallback(() => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }, [volume])

  return (
    <div className='flex items-center justify-between h-full w-full'>
      <div className='flex justify-start w-full'>
        <div className='flex items-center gap-x-4'>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className='flex lg:hidden justify-end items-center w-full'>
        <div
          onClick={handlePlay}
          className='h-10 w-10 flex items-center justify-center rounded-full bg-foreground p-1 cursor-pointer'
        >
          <Icon size={30} className='text-primary-foreground' />
        </div>
      </div>
      <div className='hidden h-full lg:flex items-center mx-auto gap-x-6'>
        <BsFillSkipStartFill
          onClick={onPlayPrevious}
          size={30}
          className='text-muted-foreground cursor-pointer hover:text-foreground transition'
        />
        <div
          onClick={handlePlay}
          className='flex items-center justify-center h-10 w-10 rounded-full bg-foreground p-1 cursor-pointer'
        >
          <Icon size={30} className='text-primary-foreground' />
        </div>
        <BsSkipEndFill
          onClick={onPlayNext}
          size={30}
          className='text-muted-foreground cursor-pointer hover:text-foreground transition'
        />
      </div>
      <div className='hidden lg:flex pr-2 ml-auto w-full justify-end'>
        <div className='flex items-center justify-end gap-x-2 max-w-[140px] w-full'>
          <VolumeIcon
            size={34}
            onClick={toggleMute}
            className='cursor-pointer'
          />
          <Slider
            max={1}
            step={0.1}
            value={[volume]}
            defaultValue={[1]}
            className={'w-full'}
            onValueChange={(vol) => setVolume(vol[0])}
          />
        </div>
      </div>
    </div>
  )
}
