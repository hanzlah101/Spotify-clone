'use client'

import * as React from 'react'
import qs from 'query-string'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = React.useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  React.useEffect(() => {
    const query = {
      q: debouncedValue,
    }

    const url = qs.stringifyUrl({
      url: '/search',
      query,
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder='What do you want to listen?'
      className='bg-foreground/5 focus:bg-foreground/10'
    />
  )
}
