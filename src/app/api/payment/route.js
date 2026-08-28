import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
     const formData = await request.formData()
    // console.log(formData,'formData');

    const userSession= await auth.api.getSession({
        headers: await headers()
    })
    const user = userSession?.user;
    
    const doctorName = formData.get('doctorName');
    const consultationFee = formData.get('consultationFee');
    const date = formData.get('date');
    const availableSlots = formData.get('availableSlots');
    const symptoms = formData.get('symptoms');
    const userId = user?.id;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: doctorName,
            },
            unit_amount: Number(consultationFee)*100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        date,
        availableSlots,
        symptoms,
        consultationFee,
        doctorName,
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
      // success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}