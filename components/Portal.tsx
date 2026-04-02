'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  RulerHorizontalIcon, HeartFilledIcon, BackpackIcon,
  CalendarIcon, RocketIcon, CubeIcon, FaceIcon,
  PersonIcon, MagicWandIcon, GearIcon, ExitIcon,
} from '@radix-ui/react-icons'
import { getDailyQuote } from '@/utils/quotes'

const quote = getDailyQuote()

export default function Portal({ displayName }: { displayName: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const sections = [
    {
      label: 'ADMIN',
      items: [
        { label: 'CONTABILIDAD', href: 'https://cash.portiahart.com', icon: <RulerHorizontalIcon /> },
        { label: 'PROVEEDORES', href: 'https://prov.portiahart.com', icon: <HeartFilledIcon /> },
        { label: 'REVISIÓN FISCAL', href: '#', icon: <BackpackIcon />, disabled: true },
      ],
    },
    {
      label: 'OPS',
      items: [
        { label: 'RESERVAS', href: '#', icon: <CalendarIcon />, disabled: true },
        { label: 'PLANES DE EVENTOS', href: 'https://events.portiahart.com', icon: <RocketIcon /> },
        { label: 'INVENTARIOS', href: '#', icon: <CubeIcon />, disabled: true },
        { label: 'CANDIDATOS', href: 'https://vacantes.portiahart.com/', icon: <FaceIcon /> },
      ],
    },
    {
      label: 'VENTAS',
      items: [
        { label: 'CRM', href: 'https://crm.portiahart.com', icon: <PersonIcon /> },
        { label: 'COTIZACIONES', href: 'https://quote.portiahart.com', icon: <MagicWandIcon /> },
      ],
    },
  ]

  return (
    <div style={s.page}>

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <img
            src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_white.png"
            alt="Hart Hospitality"
            style={s.logo}
          />
          <div style={s.headerActions}>
            <a href="/admin" style={s.iconBtn} aria-label="Ajustes">
              <GearIcon width={18} height={18} />
            </a>
            <button onClick={handleLogout} style={s.iconBtn} aria-label="Cerrar sesión">
              <ExitIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </header>

      <main style={s.main}>

        {/* Welcome */}
        <h1 style={s.welcome}>
          Hola {displayName}, ¿donde quieres ir hoy?
        </h1>

        {/* Hero buttons */}
        <div style={s.heroRow}>
          <a href="#" style={{ ...s.heroBtn, background: '#FFD000' }}>
            <svg width={24} height={24} viewBox="0 0 15 15" fill="none">
              <path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill="white" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
            <span style={s.heroBtnText}>MARCAR ENTRADA / SALIDA</span>
          </a>
          <a href="https://cash.portiahart.com" style={{ ...s.heroBtn, background: '#FC0083' }}>
            <svg width={24} height={24} viewBox="0 0 15 15" fill="none">
              <path d="M7.50009 0C7.77623 0 8.00009 0.223858 8.00009 0.5V2.02311C9.55086 2.20873 10.643 3.05386 11 4.18115C11.0857 4.44366 10.9413 4.72431 10.6788 4.80999C10.4163 4.89568 10.1356 4.75128 10.05 4.48877C9.81039 3.74428 8.9835 3.0625 7.50009 3.0625C5.57472 3.0625 4.62509 3.93757 4.62509 4.875C4.62509 5.81243 5.57472 6.6875 7.50009 6.6875C9.82972 6.6875 11.3751 7.96257 11.3751 9.875C11.3751 11.6018 9.98815 12.7527 8.00009 12.9769V14.5C8.00009 14.7761 7.77623 15 7.50009 15C7.22394 15 7.00009 14.7761 7.00009 14.5V12.9791C5.15384 12.7988 3.92831 11.8335 3.57301 10.5505C3.49901 10.282 3.65461 10.0054 3.92313 9.93136C4.19164 9.85737 4.46823 10.013 4.54222 10.2815C4.81081 11.2656 5.86108 12.0625 7.50009 12.0625C9.42545 12.0625 10.3751 11.1874 10.3751 10.25C10.3751 9.31257 9.42545 8.4375 7.50009 8.4375C5.17045 8.4375 3.62509 7.16243 3.62509 5.25C3.62509 3.52325 5.01202 2.37274 7.00009 2.14876V0.5C7.00009 0.223858 7.22394 0 7.50009 0Z" fill="white" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
            <span style={s.heroBtnText}>CASH APP</span>
          </a>
        </div>

        {/* Module sections */}
        <div className="animate-fade-in" style={s.modules}>
          {sections.map((section) => (
            <div key={section.label} style={s.section}>
              <p style={s.sectionLabel}>{section.label}</p>
              <div style={s.cardList}>
                {section.items.map((item) => (
                  item.disabled ? (
                    <div key={item.label} style={{ ...s.card, ...s.cardDisabled }}>
                      <span style={s.cardIcon}>{item.icon}</span>
                      {item.label}
                    </div>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      style={s.card}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(74,155,142,0.15)';
                        (e.currentTarget as HTMLElement).style.borderColor = '#4A9B8E';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                      }}
                    >
                      <span style={s.cardIcon}>{item.icon}</span>
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Quote */}
      <div style={s.quoteWrap}>
        <p style={s.quoteText}>"{quote.text}"</p>
        <p style={s.quoteAuthor}>— {quote.author}</p>
      </div>

    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#1F2D3D',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    position: 'sticky',
    top: 0,
    background: '#1F2D3D',
    zIndex: 10,
  },
  headerInner: {
    maxWidth: 520,
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 36,
    width: 'auto',
    objectFit: 'contain',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 6,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#7A91A5',
    textDecoration: 'none',
    lineHeight: 0,
  },
  main: {
    flex: 1,
    maxWidth: 520,
    margin: '0 auto',
    width: '100%',
    padding: '28px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  welcome: {
    fontFamily: 'Fraunces, Georgia, serif',
    fontWeight: 200,
    fontStyle: 'italic',
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'none',
    letterSpacing: 'normal',
    lineHeight: 1.4,
  },
  heroRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  heroBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '20px 12px',
    borderRadius: 6,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  heroBtnText: {
    fontFamily: 'DM Sans, system-ui, sans-serif',
    fontWeight: 500,
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'white',
    textAlign: 'center' as const,
    lineHeight: 1.4,
  },
  modules: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  sectionLabel: {
    fontFamily: 'DM Sans, system-ui, sans-serif',
    fontWeight: 500,
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#7A91A5',
    paddingLeft: 2,
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 6,
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'DM Sans, system-ui, sans-serif',
    fontWeight: 500,
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'background 0.15s, border-color 0.15s',
  },
  cardDisabled: {
    opacity: 0.35,
    cursor: 'default',
    pointerEvents: 'none' as const,
  },
  cardIcon: {
    color: '#4A9B8E',
    display: 'flex',
    flexShrink: 0,
  },
  quoteWrap: {
    maxWidth: 520,
    margin: '0 auto',
    width: '100%',
    padding: '24px 20px 48px',
    textAlign: 'right',
  },
  quoteText: {
    fontFamily: 'Fraunces, Georgia, serif',
    fontWeight: 200,
    fontStyle: 'italic',
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.5,
  },
  quoteAuthor: {
    marginTop: 8,
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.45)',
  },
}
