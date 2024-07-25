import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Log request URL for debugging
  console.log("Request URL:", request.url);

  // Get token from cookies
  const token = request.cookies.get('ACCESS_TOKEN');
  
  // Redirect to login page if no token is found and request is for protected routes
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  // Prevent navigation to login and register pages if token exists
  if (token && (request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register' || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/','/dashboard/:path*', '/auth/login', '/auth/register'], // Match specific paths for middleware
};