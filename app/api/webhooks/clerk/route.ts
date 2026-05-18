import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { supabaseAdmin } from '@/lib/supabase';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const headers = {
    'svix-id': req.headers.get('svix-id') || '',
    'svix-timestamp': req.headers.get('svix-timestamp') || '',
    'svix-signature': req.headers.get('svix-signature') || '',
  };

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(JSON.stringify(payload), headers as any) as any;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }

  const { type, data } = evt;

  if (type === 'user.created' || type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = data;
    const email = email_addresses?.[0]?.email_address;
    const fullName = [first_name, last_name].filter(Boolean).join(' ') || email?.split('@')[0];

    const { error } = await supabaseAdmin.from('users').upsert({
      clerk_id: id,
      email,
      full_name: fullName,
      avatar_url: image_url,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_id' });

    if (error) console.error('Supabase upsert error:', error);
  }

  if (type === 'user.deleted') {
    const { id } = data;
    await supabaseAdmin.from('users').delete().eq('clerk_id', id);
  }

  return NextResponse.json({ success: true });
}
