import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Song } from '@/types'

export const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient()

  if (!song) {
    return ''
  }

  const { data: songData } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path)

  return songData.publicUrl
}
