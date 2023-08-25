import { Price } from '@/types'

export const getUrl = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000'

  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export const postData = async ({
  url,
  data,
}: {
  url: string
  data?: { price: Price }
}) => {
  console.log('POST Request:', url, data)
  const res: Response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })

  if (!res.ok) {
    console.log('Error in posting data', { url, data, res })
    throw new Error(res.statusText)
  }

  return res.json()
}

export const toDateTime = (secs: number) => {
  let t = new Date('1970-01-01T00:00:00Z')
  t.setSeconds(secs)
  return t
}
