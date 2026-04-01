'use client'

import { useState } from 'react'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  inputStyle?: React.CSSProperties
  btnColor?: string
}

export default function PasswordInput({ inputStyle, btnColor = 'rgba(120,140,160,0.7)', style, ...props }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'flex', ...style }}>
      <input
        {...props}
        type={show ? 'text' : 'password'}
        style={{ ...inputStyle, paddingRight: 40, width: '100%' }}
      />
      <button
        type="button"
        onClick={() => setShow(v => !v)}
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: btnColor,
          display: 'flex',
          padding: 4,
          lineHeight: 0,
          flexShrink: 0,
        }}
      >
        {show ? <EyeClosedIcon width={15} height={15} /> : <EyeOpenIcon width={15} height={15} />}
      </button>
    </div>
  )
}
