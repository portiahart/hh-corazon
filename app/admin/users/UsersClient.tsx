'use client'

import { useState } from 'react'
import {
  PlusIcon,
  Cross2Icon,
  Pencil1Icon,
  CheckCircledIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons'
import PasswordInput from '@/components/PasswordInput'

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = { id: string; name: string }
type Company = { id: string; name: string }
type Assignment = {
  id?: string
  company_id: string
  role_id: string
  companies?: { id: string; name: string } | null
  hh_roles?: { id: string; name: string } | null
}
type User = {
  id: string
  display_name: string
  email: string
  active: boolean
  is_super_admin: boolean
  hh_user_company_roles: Assignment[]
}
type Row = { company_id: string; role_id: string }

// ─── Palette ──────────────────────────────────────────────────────────────────

const C = {
  bg: '#1F2D3D',          // Still Water
  sea: '#4A9B8E',         // Sea Glass
  ice: '#F2F5F8',         // Ice White
  mango: '#FFD000',
  pink: '#FC0083',
  modalBg: '#0F1C2A',
  border: 'rgba(242,245,248,0.12)',
  muted: 'rgba(242,245,248,0.45)',
  surface: 'rgba(242,245,248,0.06)',
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function UsersClient({
  initialUsers,
  roles,
  companies,
}: {
  initialUsers: User[]
  roles: Role[]
  companies: Company[]
}) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)

  async function refresh() {
    const res = await fetch('/api/admin/users')
    if (res.ok) setUsers((await res.json()).users ?? [])
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.ice }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, gap: 16 }}>
          <a
            href="/"
            style={{ color: C.muted, fontSize: '0.68rem', letterSpacing: '0.15em', textDecoration: 'none', fontWeight: 500 }}
          >
            ← PORTAL
          </a>
          <div style={{ flex: 1 }} />
          <button onClick={() => setCreating(true)} style={s.seaBtn}>
            <PlusIcon style={{ flexShrink: 0 }} />
            NUEVO USUARIO
          </button>
        </div>

        <p style={s.pageLabel}>GESTIÓN DE USUARIOS</p>
        <p style={s.pageCount}>{users.length} {users.length === 1 ? 'usuario' : 'usuarios'}</p>

        {/* User list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
          {users.map(u => (
            <UserCard key={u.id} user={u} onEdit={() => setEditing(u)} />
          ))}
          {users.length === 0 && (
            <p style={{ color: C.muted, fontSize: '0.82rem', textAlign: 'center', padding: '56px 0' }}>
              Sin usuarios registrados.
            </p>
          )}
        </div>
      </div>

      {/* Create modal */}
      {creating && (
        <Overlay onClose={() => setCreating(false)}>
          <CreateForm
            roles={roles}
            companies={companies}
            onSuccess={() => { setCreating(false); refresh() }}
            onCancel={() => setCreating(false)}
          />
        </Overlay>
      )}

      {/* Edit modal */}
      {editing && (
        <Overlay onClose={() => setEditing(null)}>
          <EditForm
            user={editing}
            roles={roles}
            companies={companies}
            onSuccess={() => { setEditing(null); refresh() }}
            onCancel={() => setEditing(null)}
          />
        </Overlay>
      )}
    </div>
  )
}

// ─── UserCard ─────────────────────────────────────────────────────────────────

function UserCard({ user, onEdit }: { user: User; onEdit: () => void }) {
  return (
    <div style={s.card}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Name + badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span style={s.userName}>{user.display_name}</span>
            <span style={{ ...s.badge, ...(user.active ? s.badgeActive : s.badgeInactive) }}>
              {user.active ? 'ACTIVO' : 'INACTIVO'}
            </span>
            {user.is_super_admin && (
              <span style={{ ...s.badge, background: C.mango, color: C.bg }}>SUPER ADMIN</span>
            )}
          </div>

          <p style={s.userEmail}>{user.email}</p>

          {/* Role pills */}
          {user.hh_user_company_roles.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {user.hh_user_company_roles.map((a, i) => (
                <span key={i} style={s.rolePill}>
                  {a.companies?.name ?? '—'} · {a.hh_roles?.name ?? '—'}
                </span>
              ))}
            </div>
          )}
        </div>

        <button onClick={onEdit} style={s.iconBtn} aria-label="Editar usuario">
          <Pencil1Icon width={15} height={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Overlay ──────────────────────────────────────────────────────────────────

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={s.overlay}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={s.modal}>{children}</div>
    </div>
  )
}

// ─── CreateForm ───────────────────────────────────────────────────────────────

function CreateForm({ roles, companies, onSuccess, onCancel }: {
  roles: Role[]
  companies: Company[]
  onSuccess: () => void
  onCancel: () => void
}) {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [assignments, setAssignments] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, display_name: displayName, password, assignments }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error ?? 'Error al crear usuario.')
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      <ModalHeader title="NUEVO USUARIO" onClose={onCancel} />

      <FieldLabel>EMAIL</FieldLabel>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={s.input}
        placeholder="correo@empresa.com"
        autoComplete="off"
      />

      <FieldLabel>NOMBRE COMPLETO</FieldLabel>
      <input
        type="text"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        required
        style={s.input}
        placeholder="Nombre Apellido"
      />

      <FieldLabel>CONTRASEÑA TEMPORAL</FieldLabel>
      <PasswordInput
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={8}
        inputStyle={s.input}
        btnColor={C.muted}
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
      />

      <FieldLabel>EMPRESA / ROL</FieldLabel>
      <AssignmentEditor
        rows={assignments}
        onChange={setAssignments}
        companies={companies}
        roles={roles}
      />

      {error && <p style={s.errorText}>{error}</p>}

      <div style={s.btnRow}>
        <button type="button" onClick={onCancel} style={s.ghostBtn}>CANCELAR</button>
        <button type="submit" disabled={loading} style={s.seaBtn}>
          {loading ? 'CREANDO...' : 'CREAR USUARIO'}
        </button>
      </div>
    </form>
  )
}

// ─── EditForm ─────────────────────────────────────────────────────────────────

function EditForm({ user, roles, companies, onSuccess, onCancel }: {
  user: User
  roles: Role[]
  companies: Company[]
  onSuccess: () => void
  onCancel: () => void
}) {
  const [displayName, setDisplayName] = useState(user.display_name)
  const [active, setActive] = useState(user.active)
  const [password, setPassword] = useState('')
  const [assignments, setAssignments] = useState<Row[]>(
    user.hh_user_company_roles.map(a => ({ company_id: a.company_id, role_id: a.role_id }))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const body: Record<string, unknown> = { display_name: displayName, active, assignments }
    if (password) body.password = password

    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error ?? 'Error al actualizar usuario.')
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      <ModalHeader title="EDITAR USUARIO" onClose={onCancel} />
      <p style={{ color: C.muted, fontSize: '0.75rem', marginTop: -8, marginBottom: 8 }}>{user.email}</p>

      <FieldLabel>NOMBRE COMPLETO</FieldLabel>
      <input
        type="text"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        required
        style={s.input}
      />

      <FieldLabel>ESTADO</FieldLabel>
      <div style={s.toggleRow}>
        <button
          type="button"
          onClick={() => setActive(true)}
          style={{ ...s.toggleBtn, ...(active ? s.toggleOn : s.toggleOff) }}
        >
          <CheckCircledIcon /> ACTIVO
        </button>
        <button
          type="button"
          onClick={() => setActive(false)}
          style={{ ...s.toggleBtn, ...(!active ? s.toggleOn : s.toggleOff) }}
        >
          <CrossCircledIcon /> INACTIVO
        </button>
      </div>

      <FieldLabel>EMPRESA / ROL</FieldLabel>
      <AssignmentEditor
        rows={assignments}
        onChange={setAssignments}
        companies={companies}
        roles={roles}
      />

      <FieldLabel>
        NUEVA CONTRASEÑA{' '}
        <span style={{ color: C.muted, fontWeight: 400 }}>(OPCIONAL)</span>
      </FieldLabel>
      <PasswordInput
        value={password}
        onChange={e => setPassword(e.target.value)}
        inputStyle={s.input}
        btnColor={C.muted}
        placeholder="Dejar vacío para no cambiar"
        autoComplete="new-password"
      />

      {error && <p style={s.errorText}>{error}</p>}

      <div style={s.btnRow}>
        <button type="button" onClick={onCancel} style={s.ghostBtn}>CANCELAR</button>
        <button type="submit" disabled={loading} style={s.seaBtn}>
          {loading ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
        </button>
      </div>
    </form>
  )
}

// ─── AssignmentEditor ─────────────────────────────────────────────────────────

function AssignmentEditor({ rows, onChange, companies, roles }: {
  rows: Row[]
  onChange: (rows: Row[]) => void
  companies: Company[]
  roles: Role[]
}) {
  function add() {
    onChange([...rows, { company_id: companies[0]?.id ?? '', role_id: roles[0]?.id ?? '' }])
  }
  function remove(i: number) {
    onChange(rows.filter((_, idx) => idx !== i))
  }
  function update(i: number, field: 'company_id' | 'role_id', value: string) {
    onChange(rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 4 }}>
      {rows.map((row, i) => (
        <div key={i} style={s.assignRow}>
          <select
            value={row.company_id}
            onChange={e => update(i, 'company_id', e.target.value)}
            style={s.select}
          >
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={row.role_id}
            onChange={e => update(i, 'role_id', e.target.value)}
            style={s.select}
          >
            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <button type="button" onClick={() => remove(i)} style={s.removeBtn} aria-label="Eliminar fila">
            <Cross2Icon />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} style={s.addRowBtn}>
        <PlusIcon /> AGREGAR ROL
      </button>
    </div>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div style={s.modalHeader}>
      <p style={s.modalTitle}>{title}</p>
      <button type="button" onClick={onClose} style={s.closeBtn} aria-label="Cerrar">
        <Cross2Icon />
      </button>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p style={s.fieldLabel}>{children}</p>
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  // Page
  pageLabel: {
    fontSize: '0.58rem',
    fontWeight: 600,
    letterSpacing: '0.26em',
    color: C.muted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  pageCount: {
    fontSize: '0.72rem',
    color: C.muted,
    letterSpacing: '0.04em',
  },

  // User card
  card: {
    background: C.surface,
    border: `1.5px solid ${C.border}`,
    borderRadius: 12,
    padding: '16px 18px',
  },
  userName: {
    fontWeight: 600,
    fontSize: '0.92rem',
    color: C.ice,
  },
  userEmail: {
    fontSize: '0.75rem',
    color: C.muted,
    marginTop: 3,
    letterSpacing: '0.01em',
  },
  badge: {
    display: 'inline-block',
    fontSize: '0.54rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    padding: '2px 7px',
    borderRadius: 20,
  },
  badgeActive: {
    background: C.sea,
    color: '#fff',
  },
  badgeInactive: {
    background: 'rgba(242,245,248,0.12)',
    color: C.muted,
  },
  rolePill: {
    fontSize: '0.65rem',
    background: 'rgba(242,245,248,0.07)',
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    padding: '3px 9px',
    color: C.ice,
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: C.muted,
    padding: 6,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    lineHeight: 0,
  },

  // Buttons
  seaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    background: C.sea,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: '0.64rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    cursor: 'pointer',
    fontFamily: 'inherit',
    flexShrink: 0,
  },
  ghostBtn: {
    background: 'none',
    border: `1.5px solid ${C.border}`,
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: '0.64rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    color: C.muted,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  // Overlay + modal
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8,14,20,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: 20,
  },
  modal: {
    background: C.modalBg,
    border: `1.5px solid ${C.border}`,
    borderRadius: 16,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90vh',
    overflowY: 'auto',
  },

  // Form internals
  form: {
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.22em',
    color: C.muted,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: C.muted,
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    lineHeight: 0,
  },
  fieldLabel: {
    fontSize: '0.58rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    color: C.muted,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    padding: '11px 13px',
    borderRadius: 8,
    border: `1.5px solid ${C.border}`,
    background: C.surface,
    color: C.ice,
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
  },
  toggleRow: {
    display: 'flex',
    gap: 8,
  },
  toggleBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 14px',
    borderRadius: 8,
    border: 'none',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  toggleOn: {
    background: C.sea,
    color: '#fff',
  },
  toggleOff: {
    background: C.surface,
    color: C.muted,
    border: `1.5px solid ${C.border}`,
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  errorText: {
    fontSize: '0.75rem',
    color: C.pink,
    marginTop: 4,
  },

  // Assignment editor
  assignRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: 6,
    alignItems: 'center',
  },
  select: {
    padding: '9px 10px',
    borderRadius: 8,
    border: `1.5px solid ${C.border}`,
    background: C.surface,
    color: C.ice,
    fontSize: '0.78rem',
    fontFamily: 'inherit',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: C.muted,
    cursor: 'pointer',
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    lineHeight: 0,
  },
  addRowBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'none',
    border: `1.5px dashed ${C.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    color: C.muted,
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 2,
  },
}
