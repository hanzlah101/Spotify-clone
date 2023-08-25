'use client'

import * as React from 'react'

import { cn } from '@/libs/utils'

interface BoxProps {
  children: React.ReactNode
  className?: string
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-secondary rounded-lg h-fit w-full', className)}>
      {children}
    </div>
  )
}
