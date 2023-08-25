'use client'

import { ClipLoader } from 'react-spinners'

import { Box } from '@/components/ui/box'

const Loading = () => {
  return (
    <Box className='h-full flex items-center justify-center'>
      <ClipLoader color='#22c55e' size={40} />
    </Box>
  )
}

export default Loading
