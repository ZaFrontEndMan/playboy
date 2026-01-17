'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(typeof window !== 'undefined');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username,
          password,
        }),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Small delay to ensure cookie is set, then redirect
      // The middleware will handle authentication check
      setTimeout(() => {
        window.location.href = '/admin';
      }, 100);
    } catch {
      setError('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-lg">
          <div className="h-12 bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="h-12 bg-gray-800 rounded-lg animate-pulse mb-4" />
          <div className="h-12 bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-lg">
        <h1 className="text-3xl font-heading font-bold text-brand-green uppercase mb-2 text-center">
          Admin Login
        </h1>
        <p className="  text-center mb-8">
          Enter your credentials to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-heading uppercase   mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-heading uppercase   mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

