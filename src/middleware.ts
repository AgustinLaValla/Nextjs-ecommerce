import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const newNextResponse = (message: string) =>
  new NextResponse(JSON.stringify({ message }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });

const redirectToLoginPage = (req: NextRequest) => {
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  url.pathname = `/auth/login`;
  url.search = `p=${requestedPage}`
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {

  const session = await getToken({ req });

  const isApiAdmin = req.nextUrl.pathname.startsWith('/api/admin');
  const isClientAdmin = req.nextUrl.pathname.startsWith('/admin');

  console.log(session);

  if (!session) {

    return isApiAdmin
      ? newNextResponse('Not Authenticated')
      : redirectToLoginPage(req)
  }

  const validRoles = ['admin', 'super-user', 'SEO'];
  const isValidRole = validRoles.includes((session as any)?.user?.role);

  if (isApiAdmin && !isValidRole) return newNextResponse('Not Authorized');
  if (isClientAdmin && !isValidRole) return redirectToLoginPage(req);


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