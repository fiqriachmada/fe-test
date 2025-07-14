import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('auth-storage')?.value;

  // List of protected routes
  const protectedRoutes = [
    '/dashboard',
    // '/profile',
    // '/settings',
    // '/master-data/',
    // '/delivery',
    // '/delivery-order',
    // '/purchasing-allotment',
    // '/warehouse',
    // '/finance',
    // '/purchasing/',
    // '/customer-orders',
  ];

  // List of public routes that should redirect to dashboard if session exists
  const publicRoutes = ['/login'];

  // Membiarkan route "/" bebas diakses meskipun tidak ada session
  if (request.nextUrl.pathname === '/') {
    // return NextResponse.next();

    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (publicRoutes.some((route) => request.nextUrl.pathname === route)) {
    if (session) {
      // Redirect to dashboard if there's a session and user is on a public route
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!session) {
      // Redirect to login page if there's no session and user is on a protected route
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/master-data/:path*',
    '/delivery/:path*',
    '/delivery-order/:path*',
    '/purchasing-allotment/:path*',
    '/warehouse/:path*',
    '/finance/:path*',
    '/customer-orders/:path*',
    '/purchasing/:path*',
    //
  ],
};