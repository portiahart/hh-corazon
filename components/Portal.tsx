'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  ClockIcon, DollarSignIcon, RulerHorizontalIcon, HeartFilledIcon,
  BackpackIcon, CalendarIcon, RocketIcon, CubeIcon, FaceIcon,
  PersonIcon, MagicWandIcon,
} from '@radix-ui/react-icons'

export default function Portal({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div style={s.page}>
      <div style={s.logoWrap}>
        <img
          src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_black.png"
          alt="Hart Hospitality"
          style={s.logo}
        />
      </div>

      <div style={s.heroRow}>
        <a href="#" style={{ ...s.heroBtn, background: '#FFD000', color: '#1F2D3D', border: '2.5px solid #1F2D3D' }}>
          <ClockIcon width={40} height={40} />
          <span>MARCAR ENTRADA / SALIDA</span>
        </a>
        <a href="https://cash.portiahart.com" style={{ ...s.heroBtn, background: '#1F2D3D', color: '#FFD000', border: '2.5px solid #1F2D3D' }}>
          <DollarSignIcon width={40} height={40} />
          <span>CASH APP</span>
        </a>
      </div>

      <div style={{ ...s.box, background: '#4A9B8E' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(255,255,255,0.55)' }}>ADMIN</p>
        <div style={s.grid2}>
          <AppBtn href="https://cash.portiahart.com" style={s.btnIce}><RulerHorizontalIcon /> CONTABILIDAD</AppBtn>
          <AppBtn href="https://prov.portiahart.com" style={s.btnIce}><HeartFilledIcon /> PROVEEDORES</AppBtn>
          <AppBtn href="#" style={s.btnIce}><BackpackIcon /> REVISIÓN FISCAL</AppBtn>
        </div>
      </div>

      <div style={{ ...s.box, background: '#1F2D3D' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(242,245,248,0.4)' }}>OPS</p>
        <div style={s.grid2}>
          <AppBtn href="#" style={{ ...s.btnIce, opacity: 0.4, pointerEvents: 'none' }}><CalendarIcon /> RESERVAS</AppBtn>
          <AppBtn href="https://events.portiahart.com" style={s.btnIce}><RocketIcon /> PLANES DE EVENTOS</AppBtn>
          <AppBtn href="#" style={{ ...s.btnIce, opacity: 0.4, pointerEvents: 'none' }}><CubeIcon /> INVENTARIOS</AppBtn>
          <AppBtn href="https://vacantes.portiahart.com/" style={s.btnIce}><FaceIcon /> CANDIDATOS</AppBtn>
        </div>
      </div>

      <div style={{ ...s.box, background: '#FC0083' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(255,255,255,0.55)' }}>VENTAS</p>
        <div style={s.grid2}>
          <AppBtn href="https://crm.portiahart.com" style={s.btnWhiteMango}><PersonIcon /> CRM</AppBtn>
          <AppBtn href="https://quote.portiahart.com" style={s.btnWhiteMango}><MagicWandIcon /> COTIZACIONES</AppBtn>
        </div>
      </div>

      <button onClick={handleLogout} style={s.logout}>
        Cerrar sesión ({userEmail})
      </button>
    </div>
  )
}

function AppBtn({ href, style, children }: { href: string; style: React.CSSProperties; children: React.ReactNode }) {
  return <a href={href} style={{ ...s.appBtn, ...style }}>{children}</a>
}

const s: Record<string, React.CSSProperties> = {
  page: { maxWidth: 580, margin: '0 auto', padding: '40px 20px 60px', display: 'flex', flexDirection: 'column', gap: 12 },
  logoWrap: { textAlign: 'center', marginBottom: 28 },
  logo: { height: 60, width: 'auto' },
  heroRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  heroBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', textDecoration: 'none', borderRadius: 14, padding: '28px 16px',
    gap: 16, fontSize: '0.66rem', fontWeight: 500, letterSpacing: '0.14em', lineHeight: 1.4,
  },
  box: { borderRadius: 14, padding: '22px 20px', border: '2.5px solid #1F2D3D' },
  boxLabel: { fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.24em', marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  appBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    textDecoration: 'none', borderRadius: 10, padding: '14px 12px',
    fontSize: '0.63rem', fontWeight: 500, letterSpacing: '0.14em',
  },
  btnIce: { background: '#F2F5F8', color: '#1F2D3D', border: '1.5px solid rgba(31,45,61,0.15)' },
  btnWhiteMango: { background: '#fff', color: '#FC0083', border: '1.5px solid rgba(255,255,255,0.5)' },
  logout: {
    marginTop: 8, background: 'none', border: 'none', color: '#7A91A5',
    fontSize: '0.65rem', cursor: 'pointer', fontFamily: 'inherit',
    letterSpacing: '0.05em', textAlign: 'center',
  },
}
