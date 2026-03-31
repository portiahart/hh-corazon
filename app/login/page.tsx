'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div style={s.page}>

      <img
        src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_black.png"
        alt="Hart Hospitality"
        style={s.logo}
      />

      {/* Two hero buttons — always visible */}
      <div style={s.heroRow}>
        <a href="#" style={{ ...s.heroBtn, background: '#FFD000', color: '#1F2D3D', border: '2.5px solid #1F2D3D' }}>
          <svg width={40} height={40} viewBox="0 0 15 15" fill="none">
            <path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
          <span>MARCAR ENTRADA / SALIDA</span>
        </a>
        <a href="https://cash.portiahart.com" style={{ ...s.heroBtn, background: '#1F2D3D', color: '#FFD000', border: '2.5px solid #1F2D3D' }}>
          <svg width={40} height={40} viewBox="0 0 15 15" fill="none">
            <path d="M7.50009 0C7.77623 0 8.00009 0.223858 8.00009 0.5V2.02311C9.55086 2.20873 10.643 3.05386 11 4.18115C11.0857 4.44366 10.9413 4.72431 10.6788 4.80999C10.4163 4.89568 10.1356 4.75128 10.05 4.48877C9.81039 3.74428 8.9835 3.0625 7.50009 3.0625C5.57472 3.0625 4.62509 3.93757 4.62509 4.875C4.62509 5.81243 5.57472 6.6875 7.50009 6.6875C9.82972 6.6875 11.3751 7.96257 11.3751 9.875C11.3751 11.6018 9.98815 12.7527 8.00009 12.9769V14.5C8.00009 14.7761 7.77623 15 7.50009 15C7.22394 15 7.00009 14.7761 7.00009 14.5V12.9791C5.15384 12.7988 3.92831 11.8335 3.57301 10.5505C3.49901 10.282 3.65461 10.0054 3.92313 9.93136C4.19164 9.85737 4.46823 10.013 4.54222 10.2815C4.81081 11.2656 5.86108 12.0625 7.50009 12.0625C9.42545 12.0625 10.3751 11.1874 10.3751 10.25C10.3751 9.31257 9.42545 8.4375 7.50009 8.4375C5.17045 8.4375 3.62509 7.16243 3.62509 5.25C3.62509 3.52325 5.01202 2.37274 7.00009 2.14876V0.5C7.00009 0.223858 7.22394 0 7.50009 0Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
          <span>CASH APP</span>
        </a>
      </div>

      {/* Login form */}
      <form onSubmit={handleLogin} style={s.form}>
        <p style={s.formLabel}>ACCESO</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={s.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={s.input}
        />
        {error && <p style={s.error}>{error}</p>}
        <button type="submit" disabled={loading} style={s.submitBtn}>
          {loading ? 'Entrando...' : 'ENTRAR'}
        </button>
      </form>

    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 580,
    margin: '0 auto',
    padding: '40px 20px 60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    height: 60,
    width: 'auto',
    marginBottom: 16,
  },
  heroRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    width: '100%',
  },
  heroBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    textDecoration: 'none',
    borderRadius: 14,
    padding: '28px 16px',
    gap: 16,
    fontSize: '0.66rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    lineHeight: 1.4,
  },
  form: {
    width: '100%',
    background: '#fff',
    border: '2.5px solid #1F2D3D',
    borderRadius: 14,
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 4,
  },
  formLabel: {
    fontSize: '0.58rem',
    fontWeight: 500,
    letterSpacing: '0.24em',
    color: '#7A91A5',
    marginBottom: 4,
  },
  input: {
    padding: '12px 14px',
    borderRadius: 8,
    border: '1.5px solid rgba(31,45,61,0.15)',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    background: '#F2F5F8',
    color: '#1F2D3D',
    outline: 'none',
  },
  error: { fontSize: '0.75rem', color: '#FC0083' },
  submitBtn: {
    padding: '13px',
    borderRadius: 8,
    background: '#1F2D3D',
    color: '#FFD000',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: '0.66rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    cursor: 'pointer',
    marginTop: 4,
  },
}
