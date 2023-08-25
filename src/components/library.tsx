import * as React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { TbPlaylist } from 'react-icons/tb'

import { Song } from '@/types'
import { MediaItem } from './media-item'
import { useUser } from '@/hooks/use-user'
import { useOnPlay } from '@/hooks/use-on-play'
import { useAuthDialog } from '@/hooks/use-auth-dialog'
import { useUploadDialog } from '@/hooks/use-upload-dialog'
import { useSubscribeDialog } from '@/hooks/use-subscribe-dialog'

interface LibraryProps {
  songs: Song[]
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  const authDialog = useAuthDialog()
  const uploadDialog = useUploadDialog()
  const subscribeDialog = useSubscribeDialog()
  const { user, subscription } = useUser()

  const handleClick = React.useCallback(() => {
    if (!user) {
      return authDialog.onOpen()
    }

    if (!subscription) {
      return subscribeDialog.onOpen()
    }

    return uploadDialog.onOpen()
  }, [authDialog, user, uploadDialog, subscribeDialog, subscription])

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-muted-foreground w-6 h-6' />
          <p className='text-muted-foreground font-medium text-base'>
            Your Library
          </p>
        </div>
        <IoMdAdd
          onClick={() => handleClick()}
          className='w-6 h-6 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200'
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs?.map((item) => (
          <MediaItem
            data={item}
            key={item.id}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  )
}
