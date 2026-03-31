import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
