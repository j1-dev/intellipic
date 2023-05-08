import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })
  const data = await supabase.auth.getSession()
  const token = req.cookies.get("supabase-auth-token")
  if(!!token && path !== `/dashboard/${data.data.session?.user.id}`){
    return NextResponse.redirect(new URL(`/dashboard/${data.data.session?.user.id}`, req.url))
  } 
  return res
}

export const config ={
  matcher: ["/login", "/dashboard/:id*"]
}