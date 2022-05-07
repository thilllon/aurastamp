import { NextResponse, NextRequest } from 'next/server'
import { useRouter } from 'next/router';


export function middleware(req: NextRequest): NextResponse | null {
    const { pathname } = req.nextUrl;
    if (pathname == '/') {
        // return NextResponse.redirect(new URL('/decode', req.url)) -- 주소를 /로 유지할 경우 rewrite 사용
        return NextResponse.redirect(new URL('/decode', req.url))
    }
    return NextResponse.next()
}

