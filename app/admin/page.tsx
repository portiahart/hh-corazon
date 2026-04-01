import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { PersonIcon } from '@radix-ui/react-icons'

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('crm_users')
    .select('is_super_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_super_admin) redirect('/')

  return (
    <div style={s.page}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px' }}>

        <div style={s.topBar}>
          <a href="/" style={s.backLink}>← PORTAL</a>
        </div>

        <p style={s.pageLabel}>AJUSTES</p>

        <div style={s.grid}>
          <a href="/admin/users" style={s.card}>
            <PersonIcon width={24} height={24} style={{ color: '#4A9B8E', flexShrink: 0 }} />
            <div>
              <p style={s.cardTitle}>GESTIÓN DE USUARIOS</p>
              <p style={s.cardDesc}>Crear, editar y asignar roles a los usuarios del sistema.</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    background: '#1F2D3D',
    minHeight: '100vh',
    color: '#F2F5F8',
  },
  topBar: {
    display: 'flex',
    marginBottom: 32,
  },
  backLink: {
    color: 'rgba(242,245,248,0.45)',
    fontSize: '0.68rem',
    letterSpacing: '0.15em',
    textDecoration: 'none',
    fontWeight: 500,
  },
  pageLabel: {
    fontSize: '0.58rem',
    fontWeight: 600,
    letterSpacing: '0.26em',
    color: 'rgba(242,245,248,0.45)',
    marginBottom: 20,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'rgba(242,245,248,0.06)',
    border: '1.5px solid rgba(242,245,248,0.12)',
    borderRadius: 12,
    padding: '18px 20px',
    textDecoration: 'none',
    color: '#F2F5F8',
  },
  cardTitle: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: '0.78rem',
    color: 'rgba(242,245,248,0.5)',
    lineHeight: 1.5,
  },
}
