import { Song } from '@/types'

import { useUser } from './use-user'
import { usePlayer } from './use-player'
import { useAuthDialog } from './use-auth-dialog'
import { useSubscribeDialog } from './use-subscribe-dialog'

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayer()

  const authDialog = useAuthDialog()
  const { subscription, user } = useUser()
  const subscribeDialog = useSubscribeDialog()

  const onPlay = (id: string) => {
    if (!user) {
      return authDialog.onOpen()
    }

    if (!subscription) {
      return subscribeDialog.onOpen()
    }

    player.setId(id)
    player.setIds(songs?.map((song) => song.id))
  }

  return onPlay
}
