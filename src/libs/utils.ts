import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Price } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}
