import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

async function requireSuperAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('crm_users')
    .select('is_super_admin')
    .eq('id', user.id)
    .single()
  return profile?.is_super_admin ? user : null
}

export async function GET() {
  const caller = await requireSuperAdmin()
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const admin = createAdminClient()
  const { data: users, error } = await admin
    .from('crm_users')
    .select(`
      id, display_name, email, active, is_super_admin,
      hh_user_company_roles(
        id, company_id, role_id,
        companies(id, name),
        hh_roles(id, name)
      )
    `)
    .order('display_name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const caller = await requireSuperAdmin()
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let body: {
    email: string
    display_name: string
    password: string
    assignments: { company_id: string; role_id: string }[]
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const admin = createAdminClient()

  // 1. Create Supabase Auth user (email confirmed automatically)
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
  })
  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  const userId = authData.user.id

  // 2. Insert crm_users profile
  const { error: profileError } = await admin
    .from('crm_users')
    .insert({ id: userId, email: body.email, display_name: body.display_name, active: true })

  if (profileError) {
    await admin.auth.admin.deleteUser(userId)
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  // 3. Insert company/role assignments
  if (body.assignments.length > 0) {
    const { error: rolesError } = await admin
      .from('hh_user_company_roles')
      .insert(
        body.assignments.map(a => ({ user_id: userId, company_id: a.company_id, role_id: a.role_id }))
      )
    if (rolesError) return NextResponse.json({ error: rolesError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: userId }, { status: 201 })
}
