import * as React from 'react'

import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react'

import { UserDetails, Subscription } from '@/types'

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsloadingData] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null)
  const [subscription, setSubscription] = React.useState<Subscription | null>(
    null
  )

  const getUserDetails = React.useCallback(
    () => supabase.from('users').select('*').single(),
    [supabase]
  )

  const getSubscription = React.useCallback(
    () =>
      supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single(),
    [supabase]
  )

  React.useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true)
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0]
          const subscriptionPromise = results[1]

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data as UserDetails)

          if (subscriptionPromise.status === 'fulfilled')
            setSubscription(subscriptionPromise.value.data as Subscription)

          setIsloadingData(false)
        }
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [
    user,
    isLoadingUser,
    getSubscription,
    getUserDetails,
    isLoadingData,
    subscription,
    userDetails,
  ])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`)
  }
  return context
}
