import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch (e) {
    console.error('[api/auth/login] failed to parse request body:', e)
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { email, password } = body
  console.log('[api/auth/login] attempt for:', email, '| password present:', !!password)

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email: email!, password: password! })
  if (error) {
    console.error('[api/auth/login] signInWithPassword error:', error.message, error.status, error.code)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  console.log('[api/auth/login] success, user:', data.user?.email)
  return NextResponse.json({ ok: true })
}
