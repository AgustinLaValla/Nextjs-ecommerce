import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const session = await getToken({ req });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`
    return NextResponse.redirect(url);
  }

  const validRoles = ['admin', 'super-user', 'SEO'];
  const isAdmin = req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin');
  const isValidRole = validRoles.includes((session as any)?.user?.role);

  if (isAdmin && !isValidRole) {
    return new NextResponse(JSON.stringify(
      { message: 'Not Authorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
  };


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/address',
    '/checkout/summary',
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}