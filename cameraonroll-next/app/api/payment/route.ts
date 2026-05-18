import { NextRequest, NextResponse } from 'next/server';
import { getRazorpay } from '@/lib/razorpay';
import { supabaseAdmin } from '@/lib/supabase';

const PLAN_AMOUNTS: Record<string, number> = {
  basic: 2500,      // $25 = 2500 paise (INR)
  pro: 5000,        // $50 = 5000 paise
  enterprise: 20000, // $200 = 20000 paise
};

export async function POST(req: NextRequest) {
  try {
    const { plan, userId } = await req.json();

    if (!PLAN_AMOUNTS[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const amount = PLAN_AMOUNTS[plan];

    // Create Razorpay order
    const order = await getRazorpay().orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { plan, userId },
    });

    // Record in Supabase
    const { error } = await supabaseAdmin.from('subscriptions').insert({
      user_id: userId,
      razorpay_order_id: order.id,
      plan,
      amount,
      currency: 'INR',
      status: 'created',
    });

    if (error) {
      console.error('Supabase insert error:', error);
    }

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    console.error('Payment API error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
