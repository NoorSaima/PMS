import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {locales} from '@/config';
import { auth } from '@/lib/auth';

export default async function middleware(request: NextRequest) {
  
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('dashcode-locale') || 'en';
  
  // Get pathname and check authentication
  const pathname = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const isPublicRoute = pathname.includes('/auth/login') || 
                       pathname.includes('/auth/register') ||
                       pathname.includes('/auth/forgot-password');
  
  // Check if user is authenticated
  const session = await auth();
  
  // If user is not authenticated and trying to access protected routes
  if (!session && !isPublicRoute) {
    // Extract locale from pathname or use default
    const locale = pathname.split('/')[1] && locales.includes(pathname.split('/')[1]) 
      ? pathname.split('/')[1] 
      : defaultLocale;
    
    // Redirect to login page with locale
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }
  
  // If user is authenticated and trying to access login page, redirect to home
  if (session && pathname.includes('/auth/login')) {
    const locale = pathname.split('/')[1] && locales.includes(pathname.split('/')[1]) 
      ? pathname.split('/')[1] 
      : defaultLocale;
    
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
 
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale
  });
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response
  response.headers.set('dashcode-locale', defaultLocale);
 
  return response;
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};