'use client'

import * as React from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import { useAuthDialog } from '@/hooks/use-auth-dialog'

interface ListItemProps {
  image: string
  name: string
  href: string
}

export const ListItem: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter()
  const authDialog = useAuthDialog()
  const { user } = useUser()

  const handleClick = React.useCallback(() => {
    if (!user) {
      return authDialog.onOpen()
    }

    router.push(href)
  }, [user, router, authDialog, href])

  return (
    <button
      onClick={handleClick}
      className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-foreground/10 hover:bg-foreground/20 transition-colors pr-4'
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image
          fill
          priority
          src={image}
          alt={name}
          className='object-cover overflow-hidden'
        />
      </div>
      <p className='font-medium truncate py-5'>{name}</p>
      <div className='absolute right-5 transition-all duration-300 opacity-0 rounded-full flex items-center justify-center bg-primary p-4 drop-shadow-md group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-primary-foreground' />
      </div>
    </button>
  )
}
