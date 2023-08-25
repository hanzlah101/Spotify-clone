import * as React from 'react'
import { toast } from 'sonner'
import { useSessionContext } from '@supabase/auth-helpers-react'

import { Song } from '@/types'

export const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [song, setSong] = React.useState<Song | undefined>(undefined)
  const { supabaseClient } = useSessionContext()

  React.useEffect(() => {
    if (!id) {
      return
    }

    setIsLoading(true)

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setIsLoading(false)
        return toast.error(error.message)
      }

      setSong(data as Song)
      setIsLoading(false)
    }

    fetchSong()
  }, [id, supabaseClient])

  return React.useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  )
}
