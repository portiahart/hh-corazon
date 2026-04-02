'use client';

import { useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 12) { setError('Password must be at least 12 characters.'); return; }
    if (!/[A-Z]/.test(password)) { setError('Password must contain an uppercase letter.'); return; }
    if (!/[0-9]/.test(password)) { setError('Password must contain a number.'); return; }
    if (!/[^A-Za-z0-9]/.test(password)) { setError('Password must contain a special character.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push('/');
  }

  return (
    <div style={{minHeight:'100vh',background:'#1F2D3D',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'400px'}}>
        <img
          src="https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/HH_white.png"
          alt="Hart Hospitality"
          style={{height:64,width:'auto',objectFit:'contain',marginBottom:28}}
        />
      <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'16px',padding:'48px 44px',width:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:'Georgia,serif',fontSize:'2rem',color:'#F2F5F8',marginBottom:'8px',fontWeight:200}}>Set Password</div>
        <div style={{fontSize:'.7rem',color:'#7A91A5',marginBottom:'32px'}}>Min 12 characters · uppercase · number · symbol</div>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'.58rem',letterSpacing:'.16em',textTransform:'uppercase',color:'#7A91A5',marginBottom:'6px'}}>New password</label>
            <div style={{position:'relative'}}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)}
                style={{width:'100%',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'8px',padding:'11px 40px 11px 14px',color:'#F2F5F8',fontSize:'.82rem',outline:'none',boxSizing:'border-box'}} />
              <button type="button" onClick={()=>setShowPassword(v=>!v)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#7A91A5',display:'flex',alignItems:'center',padding:0}}>
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',fontSize:'.58rem',letterSpacing:'.16em',textTransform:'uppercase',color:'#7A91A5',marginBottom:'6px'}}>Confirm password</label>
            <div style={{position:'relative'}}>
              <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={e=>setConfirm(e.target.value)}
                style={{width:'100%',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'8px',padding:'11px 40px 11px 14px',color:'#F2F5F8',fontSize:'.82rem',outline:'none',boxSizing:'border-box'}} />
              <button type="button" onClick={()=>setShowConfirm(v=>!v)} tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'}
                style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#7A91A5',display:'flex',alignItems:'center',padding:0}}>
                {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>
          {error && <div style={{background:'rgba(252,0,131,.12)',border:'1px solid rgba(252,0,131,.3)',borderRadius:'6px',padding:'10px 14px',fontSize:'.7rem',color:'#FC0083',marginBottom:'16px'}}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{width:'100%',background:'#4A9B8E',border:'none',borderRadius:'8px',padding:'12px',color:'#fff',fontSize:'.72rem',letterSpacing:'.12em',textTransform:'uppercase',cursor:loading?'wait':'pointer'}}>
            {loading ? 'Saving...' : 'Set password'}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
