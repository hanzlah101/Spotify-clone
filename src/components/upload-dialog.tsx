'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { useUser } from '@/hooks/use-user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUploadDialog } from '@/hooks/use-upload-dialog'
import { SongPayload, songSchema } from '@/libs/validations/song'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export const UploadDialog = () => {
  const { user } = useUser()
  const { isOpen, onClose } = useUploadDialog()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const form = useForm<SongPayload>({
    resolver: zodResolver(songSchema),
  })

  const { isLoading, mutate: createSong } = useMutation({
    mutationFn: async (values: SongPayload) => {
      if (!user) {
        toast.error('Oh uh, something went wrong', {
          description: 'You need to be logged in to upload a song',
        })
        throw Error('You need to be logged in to upload a song')
      }

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(
          `song-${values.title}-${values.song?.name}-${new Date(Date.now())}.${
            values.song.type
          }`,
          values.song,
          { cacheControl: '3600', upsert: false }
        )

      if (songError) {
        toast.error('Oh uh, something went wrong', {
          description: 'Error while uploading song, please try again',
        })
        console.log(songError)
        throw songError
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(
            `${values.title}-${values.image?.name}-${new Date(Date.now())}.${
              values.image.type
            }`,
            values.image,
            { cacheControl: '3600', upsert: false }
          )

      if (imageError) {
        toast.error('Oh uh, something went wrong', {
          description: 'Error while uploading image, please try again',
        })

        throw imageError
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        })

      if (supabaseError) {
        toast.error('Oh uh, something went wrong', {
          description: 'Error while creating song, please try again',
        })

        throw supabaseError
      }
    },

    onSuccess: () => {
      onClose()
      form.reset()
      router.refresh()
      window.location.reload()
      toast.success('Congratulations!', {
        description: 'Your song has been uploaded successfully!',
      })
    },

    onError: (error) => {
      console.log(error)
      toast.error('Oh uh, something went wrong', {
        description: 'Error while uploading, please try again',
      })
    },
  })

  const onSubmit: SubmitHandler<SongPayload> = (values) => {
    createSong(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your song</DialogTitle>
          <DialogDescription>
            Showcase your original music - upload your songs now!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex flex-col gap-y-3'
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select an image</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept={'.png, .jpg, .jpeg, .webp'}
                      disabled={isLoading}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='song'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a song</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='.mp3'
                      disabled={isLoading}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isLoading} size='lg' className='mt-4'>
              Upload Song
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
