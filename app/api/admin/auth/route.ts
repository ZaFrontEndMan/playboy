import { NextRequest, NextResponse } from 'next/server';
import { validateAdmin, createSession, validateSession, deleteSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, action } = body;

    if (action === 'login') {
      if (!username || !password) {
        return NextResponse.json(
          { error: 'Username and password are required' },
          { status: 400 }
        );
      }

      if (!validateAdmin(username, password)) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = createSession();
      const response = NextResponse.json({ token, success: true });
      
      // Set HTTP-only cookie with explicit settings
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours in seconds
        path: '/',
      });

      return response;
    }

    if (action === 'logout') {
      const token = request.cookies.get('admin_token')?.value;
      if (token) {
        deleteSession(token);
      }
      
      const response = NextResponse.json({ success: true });
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token || !validateSession(token)) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}

