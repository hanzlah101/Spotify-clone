'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { FiUser } from 'react-icons/fi'
import { useRouter, usePathname } from 'next/navigation'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { PiMagnifyingGlass, PiMagnifyingGlassFill } from 'react-icons/pi'

import { cn } from '@/libs/utils'
import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/hooks/use-player'
import { Button } from '@/components/ui/button'
import { useAuthDialog } from '@/hooks/use-auth-dialog'
import { HomeFillIcon, HomeIcon } from '@/components/icons'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter()
  const player = usePlayer()
  const pathname = usePathname()
  const authModal = useAuthDialog()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = React.useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()
    player.reset()

    if (error) {
      console.error(error)
      return toast.error('Oh uh, something went wrong', {
        description: error.message,
      })
    }
  }, [supabaseClient, router, player])

  return (
    <div
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden lg:flex gap-x-2 items-center'>
          <Button
            size='icon'
            icon={RxCaretLeft}
            onClick={() => router.back()}
            className='bg-background hover:bg-background/70 text-foreground'
          />

          <Button
            size='icon'
            icon={RxCaretRight}
            onClick={() => router.forward()}
            className='bg-background hover:bg-background/70 text-foreground'
          />
        </div>
        <div className='flex lg:hidden gap-x-2 items-center'>
          <Button
            size='icon'
            onClick={() => router.push('/')}
            icon={pathname !== '/search' ? HomeFillIcon : HomeIcon}
            className={cn(
              'p-2 transition-colors duration-300',
              pathname !== '/search'
                ? 'bg-foreground hover:bg-foreground/70'
                : 'bg-muted-foreground hover:bg-foreground'
            )}
          />

          <Button
            size='icon'
            onClick={() => router.push('/search')}
            icon={
              pathname === '/search' ? PiMagnifyingGlassFill : PiMagnifyingGlass
            }
            className={cn(
              'p-2 transition-colors duration-300',
              pathname === '/search'
                ? 'bg-foreground hover:bg-foreground/70'
                : 'bg-muted-foreground hover:bg-foreground'
            )}
          />
        </div>

        {user ? (
          <div className='flex gap-x-4 items-center'>
            <Button
              onClick={handleLogout}
              className='bg-foreground hover:bg-foreground/70 h-9'
            >
              Sign Out
            </Button>

            <Button
              size='icon'
              icon={FiUser}
              className='p-2 text-foreground'
              onClick={() => router.push('/account')}
            />
          </div>
        ) : (
          <div className='flex justify-between items-center gap-x-4'>
            <Button
              variant='ghost'
              onClick={() => authModal.onOpen()}
              className='hover:bg-foreground/20 h-9'
            >
              Sign Up
            </Button>

            <Button
              onClick={() => authModal.onOpen()}
              className='bg-foreground hover:bg-foreground/70 h-9'
            >
              Log In
            </Button>
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
