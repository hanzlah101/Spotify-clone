'use client'

import { Box } from '@/components/ui/box'

const Error = () => {
  return (
    <Box className='h-full flex items-center justify-center'>
      <div className='text-2xl font-semibold text-muted-foreground'>
        Something went wrong
      </div>
    </Box>
  )
}

export default Error
