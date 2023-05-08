import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const adminPath = "/admin";
  const apiAdminPath = "/api/admin";

  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session)
  if (!session || session?.user.user_metadata?.role !== "admin") {
    if (req.nextUrl.pathname.startsWith(apiAdminPath)) {
      return new NextResponse(
        JSON.stringify({ message: "authorization failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    } else if (req.nextUrl.pathname.startsWith(adminPath)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config ={
  matcher: ["/login", "/dashboard/:id*"]
}