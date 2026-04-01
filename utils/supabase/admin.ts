import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client.
 * ONLY import this in /app/api/ routes — never in components or page files.
 * The service role key bypasses RLS and must never reach the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
