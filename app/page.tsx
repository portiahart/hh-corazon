import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Portal from '@/components/Portal'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('crm_users')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'amigo'

  return <Portal displayName={displayName} />
}
