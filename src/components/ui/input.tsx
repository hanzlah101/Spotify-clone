import * as React from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/libs/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md bg-secondary focus:bg-secondary-deep transition-colors px-3 py-3 text-sm file:border-0 file:text-muted-foreground file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
