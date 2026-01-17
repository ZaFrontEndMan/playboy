'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { User, Mail, Save, AlertCircle } from 'lucide-react';

export default function AdminProfilePage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const response = await fetch('/api/admin/profile', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
      alert('Profile updated successfully!');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
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
          Profile
        </h1>
        <p style={{ color: 'var(--admin-text-muted)' }}>
          Manage your personal information and preferences
        </p>
      </div>

      <div 
        className="rounded-lg p-6"
        style={{
          backgroundColor: 'var(--admin-card-bg)',
          borderColor: 'var(--admin-border)',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="flex items-center gap-6 pb-6"
            style={{
              borderBottomColor: 'var(--admin-border)',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
            }}
          >
            <div className="w-20 h-20 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center">
              <User className="w-10 h-10 text-brand-green" />
            </div>
            <div>
              <h2 
                className="text-xl font-heading font-bold uppercase mb-1"
                style={{ color: 'var(--admin-text)' }}
              >
                {formData.username}
              </h2>
              <p 
                className="flex items-center gap-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                <Mail className="w-4 h-4" />
                {formData.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label 
                className="block text-sm font-heading uppercase mb-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
                style={{
                  backgroundColor: 'var(--admin-input-bg)',
                  borderColor: 'var(--admin-input-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--admin-text)',
                }}
              />
            </div>

            <div>
              <label 
                className="block text-sm font-heading uppercase mb-2"
                style={{ color: 'var(--admin-text-muted)' }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
                style={{
                  backgroundColor: 'var(--admin-input-bg)',
                  borderColor: 'var(--admin-input-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--admin-text)',
                }}
              />
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-heading uppercase mb-2"
              style={{ color: 'var(--admin-text-muted)' }}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
              style={{
                backgroundColor: 'var(--admin-input-bg)',
                borderColor: 'var(--admin-input-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: 'var(--admin-text)',
              }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-heading uppercase mb-2"
              style={{ color: 'var(--admin-text-muted)' }}
            >
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green resize-none"
              placeholder="Tell us about yourself..."
              style={{
                backgroundColor: 'var(--admin-input-bg)',
                borderColor: 'var(--admin-input-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: 'var(--admin-text)',
              }}
            />
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
              <p>{updateMutation.error instanceof Error ? updateMutation.error.message : 'Failed to update profile'}</p>
            </div>
          )}

          <div 
            className="flex gap-4 pt-4"
            style={{
              borderTopColor: 'var(--admin-border)',
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
            }}
          >
            <Button
              type="submit"
              variant="solid"
              className="flex items-center gap-2"
              disabled={updateMutation.isPending}
            >
              <Save className="w-4 h-4" />
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

