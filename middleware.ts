import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'never'
});

export async function middleware(req: NextRequest) {
  console.log(req.url);
  if (req.url.match('/(es|en)/dashboard/([^/]+)')) {
    // We need to create a response and hand it to the supabase client to be able to modify the response headers.
    const res = NextResponse.next();
    // Create authenticated Supabase Client.
    const supabase = createMiddlewareClient({ req, res });
    // Check if we have a session
    const {
      data: { session }
    } = await supabase.auth.getSession();

    // Check auth condition
    if (session?.user.email) {
      // Authentication successful, forward request to protected route.
      return intlMiddleware(req);
    }

    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
