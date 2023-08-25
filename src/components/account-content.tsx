'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { postData } from '@/libs/helpers'
import { useUser } from '@/hooks/use-user'
import { Button } from '@/components/ui/button'
import { useSubscribeDialog } from '@/hooks/use-subscribe-dialog'

export const AccountContent = () => {
  const router = useRouter()
  const subscribeDialog = useSubscribeDialog()
  const { isLoading, subscription, user } = useUser()

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  const redirectToCustomerPortal = React.useCallback(async () => {
    setLoading(true)
    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      })
      window.location.assign(url)
    } catch (error) {
      console.log(error)
      if (error) return alert((error as Error).message)
    }
    setLoading(false)
  }, [])

  return (
    <div className='mb-7 px-6'>
      {!subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>No active plan.</p>
          <Button onClick={subscribeDialog.onOpen} className='w-[300px]'>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            className='w-[300px]'
            isLoading={loading || isLoading}
            onClick={redirectToCustomerPortal}
          >
            Manage Subscription
          </Button>
        </div>
      )}
    </div>
  )
}
