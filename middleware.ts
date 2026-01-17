import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    const cookie = request.cookies.get('admin_token');
    const token = cookie?.value;
    
    // Check if token exists and is valid
    let isAuthenticated = false;
    if (token && typeof token === 'string' && token.trim() !== '') {
      try {
        isAuthenticated = validateSession(token);
      } catch {
        // If validation fails, treat as unauthenticated
        isAuthenticated = false;
      }
    }

    // Allow access to login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Allow access to dashboard if authenticated
    if (pathname === '/admin') {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

