import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

function verifySignature(razorpayOrderId: string, razorpayPaymentId: string, secret: string) {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  return crypto.createHmac('sha256', secret).update(body).digest('hex');
}

const PLAN_LIMITS: Record<string, number> = {
  basic: 50,
  pro: 999999, // unlimited
  enterprise: 999999,
};

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, userId } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSig = verifySignature(razorpay_order_id, razorpay_payment_id, secret);

    if (expectedSig !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Update subscription
    await (supabaseAdmin as any)
      .from('subscriptions')
      .update({
        razorpay_payment_id,
        status: 'captured',
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id);

    // Insert payment record
    await (supabaseAdmin as any).from('payments').insert({
      user_id: userId,
      razorpay_payment_id,
      razorpay_order_id,
      amount: PLAN_LIMITS[plan] === 999999 ? 0 : PLAN_LIMITS[plan] * 100,
      status: 'captured',
    });

    // Update user plan
    await (supabaseAdmin as any)
      .from('users')
      .update({
        plan,
        subscription_status: 'active',
        generations_limit: PLAN_LIMITS[plan],
        generations_used: 0,
        subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Verify error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
