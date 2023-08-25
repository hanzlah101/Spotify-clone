'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { postData } from '@/libs/helpers'
import { formatPrice } from '@/libs/utils'
import { useUser } from '@/hooks/use-user'
import { Button } from '@/components/ui/button'
import { getStripe } from '@/libs/stripe-client'
import { Price, ProductWithPrice } from '@/types'
import { useSubscribeDialog } from '@/hooks/use-subscribe-dialog'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SubscribeDialogProps {
  products: ProductWithPrice[]
}

export const SubscribeDialog: React.FC<SubscribeDialogProps> = ({
  products,
}) => {
  const subscribeDialog = useSubscribeDialog()
  const { user, isLoading, subscription } = useUser()

  const [priceIdLoading, setPriceIdLoading] = React.useState<string>()

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeDialog.onClose()
    }
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)
    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error('Must be logged in')
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('Already subscribed')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  let content = <div className='text-center'>No products available.</div>

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>
          }

          return product.prices.map((price) => (
            <Button
              size='lg'
              key={price.id}
              className='mb-4'
              disabled={isLoading}
              onClick={() => handleCheckout(price)}
            >
              {`Subscribe for ${formatPrice(price)} a ${price?.interval}`}
            </Button>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = <div className='text-center'>Already subscribed.</div>
  }

  return (
    <Dialog
      open={subscribeDialog.isOpen}
      onOpenChange={subscribeDialog.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Only for premium users</DialogTitle>
          <DialogDescription>
            Listen to music with Spotify Premium
          </DialogDescription>
        </DialogHeader>
        <div className='py-3'>{content}</div>
      </DialogContent>
    </Dialog>
  )
}
