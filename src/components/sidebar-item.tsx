import * as React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

import { cn } from '@/libs/utils'

interface SidebarItemProps {
  label: string
  href: string
  active: boolean
  icon: IconType
  activeIcon: IconType
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  active,
  icon: Icon,
  activeIcon: ActiveIcon,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-auto items-center w-full text-base gap-x-4 font-medium cursor-pointer py-1 group',
        active
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {active ? (
        <ActiveIcon className='h-6 w-6' />
      ) : (
        <Icon className='h-6 w-6' />
      )}
      <p className='truncate w-full transition-colors duration-300'>{label}</p>
    </Link>
  )
}
