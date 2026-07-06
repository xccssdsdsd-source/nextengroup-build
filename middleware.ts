import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  if (host.startsWith('www.')) {
    const nonWwwUrl = request.url.replace(`://${host}`, `://${host.slice(4)}`)
    return NextResponse.redirect(nonWwwUrl, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|robots.txt|.*\.(?:svg|jpg|jpeg|png|gif|webp|avif|ico|css|js|woff|woff2)).*)'],
}
