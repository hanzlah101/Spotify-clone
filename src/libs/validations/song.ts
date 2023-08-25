import * as z from 'zod'

export const songSchema = z.object({
  title: z
    .string({ required_error: 'Please enter a title' })
    .min(3, { message: 'Title must be at least 3 characters' })
    .nonempty(),
  author: z
    .string({ required_error: 'Please enter author name' })
    .min(3, { message: 'Author name must be at least 3 characters' })
    .nonempty(),
  image: z.any({ required_error: 'Please select an image' }),
  song: z.any({ required_error: 'Please select a song' }),
})

export type SongPayload = z.infer<typeof songSchema>
