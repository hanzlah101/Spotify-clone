import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { stripe } from '@/libs/stripe'
import { getUrl } from '@/libs/helpers'
import { createOrRetrieveCustomer } from '@/libs/supabase-admin'

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json()

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    const session = await stripe.checkout.sessions.create({
      customer,
      mode: 'subscription',
      cancel_url: `${getUrl()}/`,
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      subscription_data: { metadata },
      success_url: `${getUrl()}/account`,
      billing_address_collection: 'required',
      line_items: [{ price: price.id, quantity }],
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.log(err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
