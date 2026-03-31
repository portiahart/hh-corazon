import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  console.log('[auth/callback] cookies on request:', (request as any).cookies?.getAll?.() ?? 'n/a')
  if (code) {
    const supabase = createClient()
    const result = await supabase.auth.exchangeCodeForSession(code)
    console.log('[auth/callback] exchangeCodeForSession error:', result.error)
  }
  return NextResponse.redirect(`${origin}/`)
}
