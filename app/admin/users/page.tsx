import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UsersClient from './UsersClient'

export default async function AdminUsersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Super admin guard
  const { data: profile } = await supabase
    .from('crm_users')
    .select('is_super_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_super_admin) redirect('/')

  // Fetch all data in parallel
  const [usersRes, rolesRes, companiesRes] = await Promise.all([
    supabase
      .from('crm_users')
      .select(`
        id, display_name, email, active, is_super_admin,
        hh_user_company_roles(
          id, company_id, role_id,
          companies(id, name),
          hh_roles(id, name)
        )
      `)
      .order('display_name'),
    supabase.from('hh_roles').select('id, name').order('name'),
    supabase.from('companies').select('id, name').order('name'),
  ])

  return (
    <UsersClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialUsers={(usersRes.data ?? []) as any}
      roles={rolesRes.data ?? []}
      companies={companiesRes.data ?? []}
    />
  )
}
