import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authApiController } from './pages/api/auth';

export const middleware = async (request: NextRequest) => {
    
    const token = request.cookies.get('token')?.value

    if(!token) return NextResponse.redirect(new URL('/login', request.url))
    
    const authResult = await authApiController(token )

    if(authResult === false) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/users', '/', '/user-posts', '/user-album']
}
