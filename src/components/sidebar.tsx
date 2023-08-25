'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { PiMagnifyingGlass, PiMagnifyingGlassFill } from 'react-icons/pi'

import { Song } from '@/types'
import { cn } from '@/libs/utils'
import { Box } from '@/components/ui/box'
import { usePlayer } from '@/hooks/use-player'
import { Library } from '@/components/library'
import { SidebarItem } from '@/components/sidebar-item'
import { HomeIcon, HomeFillIcon } from '@/components/icons'

interface SidebarProps {
  children: React.ReactNode
  songs: Song[]
}

export const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname()
  const player = usePlayer()

  const routes = React.useMemo(() => {
    return [
      {
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
        icon: HomeIcon,
        activeIcon: HomeFillIcon,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: PiMagnifyingGlass,
        activeIcon: PiMagnifyingGlassFill,
      },
    ]
  }, [pathname])

  return (
    <div className={cn('flex h-full', player.activeId && 'pb-20')}>
      <div className='hidden lg:flex flex-col gap-y-2 bg-background h-full w-[300px] p-2'>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {routes.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </div>
        </Box>
        <Box className='!h-full overflow-y-auto'>
          <Library songs={songs} />
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  )
}
