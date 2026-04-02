'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  ClockIcon, RulerHorizontalIcon, HeartFilledIcon,
  BackpackIcon, CalendarIcon, RocketIcon, CubeIcon, FaceIcon,
  PersonIcon, MagicWandIcon, GearIcon, ExitIcon,
} from '@radix-ui/react-icons'

export default function Portal() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div style={s.outer}>
    <div style={s.page}>

      <div style={s.logoRow}>
        <div style={s.logoSpacer} />
        <img
          src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_white.png"
          alt="Hart Hospitality"
          style={s.logo}
        />
        <div style={s.topBar}>
          <a href="/admin" style={s.topBtn} aria-label="Ajustes">
            <GearIcon width={17} height={17} />
          </a>
          <button onClick={handleLogout} style={s.topBtn} aria-label="Cerrar sesión">
            <ExitIcon width={17} height={17} />
          </button>
        </div>
      </div>

      <div style={s.heroRow}>
        <a href="#" style={{ ...s.heroBtn, background: '#FC0083', color: '#F2F5F8' }}>
          <ClockIcon width={40} height={40} />
          <span>MARCAR ENTRADA / SALIDA</span>
        </a>
        <a href="https://cash.portiahart.com" style={{ ...s.heroBtn, background: '#4A9B8E', color: '#F2F5F8' }}>
        <svg width={40} height={40} viewBox="0 0 15 15" fill="none"><path d="M7.50009 0C7.77623 0 8.00009 0.223858 8.00009 0.5V2.02311C9.55086 2.20873 10.643 3.05386 11 4.18115C11.0857 4.44366 10.9413 4.72431 10.6788 4.80999C10.4163 4.89568 10.1356 4.75128 10.05 4.48877C9.81039 3.74428 8.9835 3.0625 7.50009 3.0625C5.57472 3.0625 4.62509 3.93757 4.62509 4.875C4.62509 5.81243 5.57472 6.6875 7.50009 6.6875C9.82972 6.6875 11.3751 7.96257 11.3751 9.875C11.3751 11.6018 9.98815 12.7527 8.00009 12.9769V14.5C8.00009 14.7761 7.77623 15 7.50009 15C7.22394 15 7.00009 14.7761 7.00009 14.5V12.9791C5.15384 12.7988 3.92831 11.8335 3.57301 10.5505C3.49901 10.282 3.65461 10.0054 3.92313 9.93136C4.19164 9.85737 4.46823 10.013 4.54222 10.2815C4.81081 11.2656 5.86108 12.0625 7.50009 12.0625C9.42545 12.0625 10.3751 11.1874 10.3751 10.25C10.3751 9.31257 9.42545 8.4375 7.50009 8.4375C5.17045 8.4375 3.62509 7.16243 3.62509 5.25C3.62509 3.52325 5.01202 2.37274 7.00009 2.14876V0.5C7.00009 0.223858 7.22394 0 7.50009 0Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/></svg>
          <span>CASH APP</span>
        </a>
      </div>

      <div style={{ ...s.box, background: '#4A9B8E', border: '2.5px solid #F2F5F8' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(242,245,248,0.7)' }}>ADMIN</p>
        <div style={s.grid2}>
          <AppBtn href="https://cash.portiahart.com" style={s.btnIce}><RulerHorizontalIcon /> CONTABILIDAD</AppBtn>
          <AppBtn href="https://prov.portiahart.com" style={s.btnIce}><HeartFilledIcon /> PROVEEDORES</AppBtn>
          <AppBtn href="#" style={s.btnIce}><BackpackIcon /> REVISIÓN FISCAL</AppBtn>
        </div>
      </div>

      <div style={{ ...s.box, background: '#F2F5F8', border: '2.5px solid #4A9B8E' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(31,45,61,0.45)' }}>OPS</p>
        <div style={s.grid2}>
          <AppBtn href="#" style={{ ...s.btnMango, opacity: 0.4, pointerEvents: 'none' }}><CalendarIcon /> RESERVAS</AppBtn>
          <AppBtn href="https://events.portiahart.com" style={s.btnMango}><RocketIcon /> PLANES DE EVENTOS</AppBtn>
          <AppBtn href="#" style={{ ...s.btnMango, opacity: 0.4, pointerEvents: 'none' }}><CubeIcon /> INVENTARIOS</AppBtn>
          <AppBtn href="https://vacantes.portiahart.com/" style={s.btnMango}><FaceIcon /> CANDIDATOS</AppBtn>
        </div>
      </div>

      <div style={{ ...s.box, background: '#FC0083', border: '2.5px solid #F2F5F8' }}>
        <p style={{ ...s.boxLabel, color: 'rgba(242,245,248,0.7)' }}>VENTAS</p>
        <div style={s.grid2}>
          <AppBtn href="https://crm.portiahart.com" style={s.btnIce}><PersonIcon /> CRM</AppBtn>
          <AppBtn href="https://quote.portiahart.com" style={s.btnIce}><MagicWandIcon /> COTIZACIONES</AppBtn>
        </div>
      </div>

    </div>
    </div>
  )
}

function AppBtn({ href, style, children }: { href: string; style: React.CSSProperties; children: React.ReactNode }) {
  return <a href={href} style={{ ...s.appBtn, ...style }}>{children}</a>
}

const s: Record<string, React.CSSProperties> = {
  outer: { minHeight: '100vh', background: '#1F2D3D' },
  page: { maxWidth: 580, margin: '0 auto', padding: '20px 20px 60px', display: 'flex', flexDirection: 'column', gap: 12 },
  logoRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  logoSpacer: { display: 'flex', gap: 4, visibility: 'hidden', pointerEvents: 'none' },
  topBar: { display: 'flex', gap: 4 },
  topBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,245,248,0.45)',
    padding: 8, borderRadius: 8, textDecoration: 'none', lineHeight: 0,
  },
  logo: { height: 60, width: 'auto' },
  heroRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  heroBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', textDecoration: 'none', borderRadius: 14, padding: '28px 16px',
    gap: 16, fontSize: '0.66rem', fontWeight: 500, letterSpacing: '0.14em', lineHeight: 1.4,
  },
  box: { borderRadius: 14, padding: '22px 20px' },
  boxLabel: { fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.24em', marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  appBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    textDecoration: 'none', borderRadius: 10, padding: '14px 12px',
    fontSize: '0.63rem', fontWeight: 500, letterSpacing: '0.14em',
  },
  btnIce: { background: '#F2F5F8', color: '#1F2D3D', border: '1.5px solid rgba(31,45,61,0.15)' },
  btnMango: { background: '#FC0083', color: '#F2F5F8', border: '1.5px solid rgba(252,0,131,0.3)' },
}
