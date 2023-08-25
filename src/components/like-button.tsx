'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2'
import { useSessionContext } from '@supabase/auth-helpers-react'

import { useUser } from '@/hooks/use-user'
import { useAuthDialog } from '@/hooks/use-auth-dialog'

interface LikeButtonProps {
  songId: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()
  const { user } = useUser()
  const authDialog = useAuthDialog()

  const [isLiked, setIsLiked] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? HiHeart : HiOutlineHeart

  const handleLike = React.useCallback(async () => {
    {
      if (!user) {
        return authDialog.onOpen()
      }

      if (isLiked) {
        const { error } = await supabaseClient
          .from('liked_songs')
          .delete()
          .eq('user_id', user.id)
          .eq('song_id', songId)

        if (error) {
          toast.error(error.message)
        } else {
          setIsLiked(false)
        }
      } else {
        const { error } = await supabaseClient.from('liked_songs').insert({
          song_id: songId,
          user_id: user.id,
        })

        if (error) {
          toast.error(error.message)
        } else {
          setIsLiked(true)
          toast.success('Liked')
        }
      }

      router.refresh()
    }
  }, [user, isLiked, supabaseClient, songId, router, authDialog])

  return (
    <button
      className='
    cursor-pointer 
    hover:opacity-75 
    transition
  '
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}
