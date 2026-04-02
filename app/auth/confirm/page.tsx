'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AuthConfirm() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function handleConfirm() {
      const searchParams = new URLSearchParams(window.location.search);
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const code = searchParams.get('code');

      // token_hash flow (what the reset email sends)
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as any });
        if (error) { router.replace('/?error=link_expired'); return; }
        router.replace('/auth/update-password');
        return;
      }

      // PKCE flow
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) { router.replace('/?error=link_expired'); return; }
        router.replace('/auth/update-password');
        return;
      }

      // Implicit flow (hash fragment)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) { router.replace('/?error=link_expired'); return; }
        router.replace('/auth/update-password');
        return;
      }

      // Fallback
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) { router.replace('/?error=link_expired'); return; }
      router.replace('/auth/update-password');
    }

    handleConfirm();
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#1F2D3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#4A9B8E', fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 200, letterSpacing: '0.05em' }}>
        Verifying your link...
      </div>
    </div>
  );
}
