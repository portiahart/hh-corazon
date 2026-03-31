'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div style={styles.page}>
      <img
        src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_black.png"
        alt="Hart Hospitality"
        style={styles.logo}
      />
      <form onSubmit={handleLogin} style={styles.form}>
        <p style={styles.formLabel}>ACCESO</p>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="Contraseña" value={password}
          onChange={e => setPassword(e.target.value)} required style={styles.input} />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Entrando...' : 'ENTRAR'}
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 400, margin: '0 auto', padding: '80px 20px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
  },
  logo: { height: 60, width: 'auto' },
  form: {
    width: '100%', background: '#fff', border: '2.5px solid #1F2D3D',
    borderRadius: 14, padding: '24px 20px', display: 'flex',
    flexDirection: 'column', gap: 10,
  },
  formLabel: { fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.24em', color: '#7A91A5', marginBottom: 4 },
  input: {
    padding: '12px 14px', borderRadius: 8, border: '1.5px solid rgba(31,45,61,0.15)',
    fontSize: '0.875rem', fontFamily: 'inherit', background: '#F2F5F8', color: '#1F2D3D',
  },
  error: { fontSize: '0.75rem', color: '#FC0083' },
  submitBtn: {
    padding: 13, borderRadius: 8, background: '#1F2D3D', color: '#FFD000',
    border: 'none', fontFamily: 'inherit', fontSize: '0.66rem', fontWeight: 500,
    letterSpacing: '0.14em', cursor: 'pointer', marginTop: 4,
  },
}
