'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Save, Bell, Shield, Globe, AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
    },
  });

  const { data: savedSettings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const response = await fetch('/api/admin/settings', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch settings');
      return response.json();
    },
  });

  useEffect(() => {
    if (savedSettings) {
      setSettings({
        notifications: savedSettings.notifications || settings.notifications,
        security: savedSettings.security || settings.security,
        preferences: savedSettings.preferences || settings.preferences,
      });
    }
  }, [savedSettings]);

  const updateMutation = useMutation({
    mutationFn: async (data: typeof settings) => {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update settings');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      alert('Settings saved successfully!');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div 
          className="rounded-lg p-6 animate-pulse"
          style={{
            backgroundColor: 'var(--admin-card-bg)',
            borderColor: 'var(--admin-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div 
            className="h-8 rounded mb-4 w-1/3"
            style={{ backgroundColor: 'var(--admin-hover-bg)' }}
          />
          <div 
            className="h-4 rounded w-1/2"
            style={{ backgroundColor: 'var(--admin-hover-bg)' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 
          className="text-3xl font-heading font-bold uppercase mb-2"
          style={{ color: 'var(--admin-text)' }}
        >
          Settings
        </h1>
        <p style={{ color: 'var(--admin-text-muted)' }}>
          Configure your account settings and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notifications */}
        <div 
          className="rounded-lg p-6"
          style={{
            backgroundColor: 'var(--admin-card-bg)',
            borderColor: 'var(--admin-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-brand-green" />
            <h2 
              className="text-xl font-heading font-bold uppercase"
              style={{ color: 'var(--admin-text)' }}
            >
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span style={{ color: 'var(--admin-text-muted)' }}>Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      email: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                style={{
                  borderColor: 'var(--admin-input-border)',
                  backgroundColor: 'var(--admin-input-bg)',
                }}
              />
            </label>

            <label className="flex items-center justify-between">
              <span style={{ color: 'var(--admin-text-muted)' }}>Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      push: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                style={{
                  borderColor: 'var(--admin-input-border)',
                  backgroundColor: 'var(--admin-input-bg)',
                }}
              />
            </label>

            <label className="flex items-center justify-between">
              <span style={{ color: 'var(--admin-text-muted)' }}>SMS Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      sms: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                style={{
                  borderColor: 'var(--admin-input-border)',
                  backgroundColor: 'var(--admin-input-bg)',
                }}
              />
            </label>
          </div>
        </div>

        {/* Security */}
        <div 
          className="rounded-lg p-6"
          style={{
            backgroundColor: 'var(--admin-card-bg)',
            borderColor: 'var(--admin-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-brand-green" />
            <h2 
              className="text-xl font-heading font-bold uppercase"
              style={{ color: 'var(--admin-text)' }}
            >
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span style={{ color: 'var(--admin-text-muted)' }}>Two-Factor Authentication</span>
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      twoFactor: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                style={{
                  borderColor: 'var(--admin-input-border)',
                  backgroundColor: 'var(--admin-input-bg)',
                }}
              />
            </label>

            <div>
              <label 
                className="block text-sm font-heading uppercase mb-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      sessionTimeout: Number(e.target.value),
                    },
                  })
                }
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
                style={{
                  backgroundColor: 'var(--admin-input-bg)',
                  borderColor: 'var(--admin-input-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--admin-text)',
                }}
                min="5"
                max="1440"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div 
          className="rounded-lg p-6"
          style={{
            backgroundColor: 'var(--admin-card-bg)',
            borderColor: 'var(--admin-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-brand-green" />
            <h2 
              className="text-xl font-heading font-bold uppercase"
              style={{ color: 'var(--admin-text)' }}
            >
              Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-heading uppercase mb-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      language: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
                style={{
                  backgroundColor: 'var(--admin-input-bg)',
                  borderColor: 'var(--admin-input-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--admin-text)',
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label 
                className="block text-sm font-heading uppercase mb-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                Timezone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      timezone: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
                style={{
                  backgroundColor: 'var(--admin-input-bg)',
                  borderColor: 'var(--admin-input-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--admin-text)',
                }}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>

        {updateMutation.isError && (
          <div 
            className="rounded-lg p-4 flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.5)',
              borderWidth: '1px',
              borderStyle: 'solid',
              color: 'rgb(248, 113, 113)',
            }}
          >
            <AlertCircle className="w-5 h-5" />
            <p>{updateMutation.error instanceof Error ? updateMutation.error.message : 'Failed to update settings'}</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="solid"
            className="flex items-center gap-2"
            disabled={updateMutation.isPending}
          >
            <Save className="w-4 h-4" />
            {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}

