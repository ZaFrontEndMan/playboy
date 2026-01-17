import { NextRequest, NextResponse } from 'next/server';
import { getAdminProfile, updateAdminProfile } from '@/lib/admin/profile';
import { validateSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith('admin_token='))
      ?.split('=')[1];

    if (!token || !validateSession(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = getAdminProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith('admin_token='))
      ?.split('=')[1];

    if (!token || !validateSession(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { username, email, firstName, lastName, bio, avatar } = body;

    // Validate required fields
    if (!username || !email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const updatedProfile = updateAdminProfile({
      username,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      bio: bio || '',
      avatar: avatar || '',
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}


