'use client'

import * as React from 'react'
import { Toaster } from 'sonner'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { Database } from '@/types/db'
import { MyUserContextProvider } from '@/hooks/use-user'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [supabaseClient] = React.useState(() =>
    createClientComponentClient<Database>()
  )

  const queryClient = new QueryClient()

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MyUserContextProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />

          {children}
        </QueryClientProvider>
      </MyUserContextProvider>
    </SessionContextProvider>
  )
}
