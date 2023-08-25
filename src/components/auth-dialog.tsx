'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'

import { useAuthDialog } from '@/hooks/use-auth-dialog'

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/components/ui/dialog'

export const AuthDialog = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  const { session } = useSessionContext()
  const { isOpen, onClose } = useAuthDialog()

  React.useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>Log in to your account</DialogDescription>
        </DialogHeader>

        <Auth
          theme='dark'
          magicLink={true}
          providers={['github']}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#22c55e',
                  brandAccent: '#22c55e',
                },
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
