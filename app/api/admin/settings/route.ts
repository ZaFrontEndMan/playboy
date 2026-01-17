import { NextRequest, NextResponse } from 'next/server';
import { getAdminSettings, updateAdminSettings } from '@/lib/admin/settings';
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

    const settings = getAdminSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
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
    const { notifications, security, preferences } = body;

    // Validate and update settings
    const updates: any = {};

    if (notifications) {
      updates.notifications = {
        email: notifications.email ?? true,
        push: notifications.push ?? false,
        sms: notifications.sms ?? false,
      };
    }

    if (security) {
      updates.security = {
        twoFactor: security.twoFactor ?? false,
        sessionTimeout: security.sessionTimeout ?? 30,
      };
      
      // Validate session timeout
      if (updates.security.sessionTimeout < 5 || updates.security.sessionTimeout > 1440) {
        return NextResponse.json(
          { error: 'Session timeout must be between 5 and 1440 minutes' },
          { status: 400 }
        );
      }
    }

    if (preferences) {
      const validLanguages = ['en', 'es', 'fr', 'de'];
      const validTimezones = ['UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'];
      
      updates.preferences = {
        language: preferences.language && validLanguages.includes(preferences.language)
          ? preferences.language
          : 'en',
        timezone: preferences.timezone && validTimezones.includes(preferences.timezone)
          ? preferences.timezone
          : 'UTC',
      };
    }

    const updatedSettings = updateAdminSettings(updates);
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}


