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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const caller = await requireSuperAdmin()
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let body: {
    display_name?: string
    active?: boolean
    password?: string
    assignments?: { company_id: string; role_id: string }[]
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Update crm_users profile fields
  const profileUpdate: Record<string, unknown> = {}
  if (body.display_name !== undefined) profileUpdate.display_name = body.display_name
  if (body.active !== undefined) profileUpdate.active = body.active

  if (Object.keys(profileUpdate).length > 0) {
    const { error } = await admin
      .from('crm_users')
      .update(profileUpdate)
      .eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update password via Auth admin API
  if (body.password) {
    const { error } = await admin.auth.admin.updateUserById(params.id, {
      password: body.password,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Replace company/role assignments (delete-then-insert)
  if (body.assignments !== undefined) {
    const { error: deleteError } = await admin
      .from('hh_user_company_roles')
      .delete()
      .eq('user_id', params.id)
    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })

    if (body.assignments.length > 0) {
      const { error: insertError } = await admin
        .from('hh_user_company_roles')
        .insert(
          body.assignments.map(a => ({
            user_id: params.id,
            company_id: a.company_id,
            role_id: a.role_id,
          }))
        )
      if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
