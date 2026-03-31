import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

/**
 * Rewrites a single Set-Cookie header string for any sb-* cookie, stripping
 * any existing Domain/Secure/SameSite attributes and replacing them with the
 * canonical values we want. Non-sb-* cookies are returned unchanged.
 */
function rewriteSupabaseCookie(header: string): string {
  const [nameValue, ...parts] = header.split(';')
  if (!nameValue.trim().startsWith('sb-')) return header

  const filtered = parts
    .map(p => p.trim())
    .filter(p => {
      const lower = p.toLowerCase()
      return (
        !lower.startsWith('domain=') &&
        lower !== 'secure' &&
        !lower.startsWith('samesite=')
      )
    })

  return [nameValue, ...filtered, 'Domain=.portiahart.com', 'Secure', 'SameSite=Lax'].join('; ')
}

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  // Force correct domain/secure/samesite on every sb-* Set-Cookie header.
  // This runs after @supabase/ssr has already written the cookies, so it
  // overrides whatever domain or flags the library chose.
  const setCookies: string[] = response.headers.getSetCookie()
  console.log('[middleware] Set-Cookie BEFORE rewrite:', setCookies)
  if (setCookies.length > 0) {
    response.headers.delete('set-cookie')
    const rewritten: string[] = []
    for (const cookie of setCookies) {
      rewritten.push(rewriteSupabaseCookie(cookie))
    }
    console.log('[middleware] Set-Cookie AFTER rewrite:', rewritten)
    for (const cookie of rewritten) {
      response.headers.append('set-cookie', cookie)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
