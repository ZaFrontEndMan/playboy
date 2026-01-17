'use client';

import { useQuery } from '@tanstack/react-query';
import { Package, TrendingUp, Tag, Star, Box, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  products: {
    total: number;
    newArrivals: number;
    bestsellers: number;
    onSale: number;
  };
  drops: {
    total: number;
    available: number;
    comingSoon: number;
  };
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'brand-green' | 'blue' | 'yellow' | 'red' | 'purple' | 'green' | 'orange';
  href?: string;
}

const iconColorClasses = {
  'brand-green': 'text-brand-green',
  'blue': 'text-blue-500',
  'yellow': 'text-yellow-500',
  'red': 'text-red-500',
  'purple': 'text-purple-500',
  'green': 'text-green-500',
  'orange': 'text-orange-500',
};

const borderHoverClasses = {
  'brand-green': 'hover:border-brand-green/50',
  'blue': 'hover:border-blue-500/50',
  'yellow': 'hover:border-yellow-500/50',
  'red': 'hover:border-red-500/50',
  'purple': 'hover:border-purple-500/50',
  'green': 'hover:border-green-500/50',
  'orange': 'hover:border-orange-500/50',
};

function StatCard({ title, value, icon, color, href }: StatCardProps) {
  const iconColor = iconColorClasses[color];
  const borderHover = borderHoverClasses[color];
  const content = (
    <div 
      className={`rounded-lg p-6 transition-all ${borderHover} ${href ? 'cursor-pointer hover:scale-105' : ''}`}
      style={{
        backgroundColor: 'var(--admin-card-bg)',
        borderColor: 'var(--admin-border)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-sm font-heading uppercase tracking-wider"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          {title}
        </h3>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
      <p 
        className="text-3xl font-bold"
        style={{ color: 'var(--admin-text)' }}
      >
        {value}
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery<Stats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/stats', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-6 animate-pulse"
              style={{
                backgroundColor: 'var(--admin-card-bg)',
                borderColor: 'var(--admin-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <div 
                className="h-4 rounded mb-4 w-1/2"
                style={{ backgroundColor: 'var(--admin-hover-bg)' }}
              />
              <div 
                className="h-8 rounded w-1/3"
                style={{ backgroundColor: 'var(--admin-hover-bg)' }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.5)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: 'rgb(248, 113, 113)',
        }}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load statistics. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats?.products.total || 0}
          icon={<Package className="w-6 h-6" />}
          color="brand-green"
          href="/admin/products"
        />
        <StatCard
          title="New Arrivals"
          value={stats?.products.newArrivals || 0}
          icon={<Star className="w-6 h-6" />}
          color="blue"
          href="/admin/products?isNew=true"
        />
        <StatCard
          title="Bestsellers"
          value={stats?.products.bestsellers || 0}
          icon={<TrendingUp className="w-6 h-6" />}
          color="yellow"
          href="/admin/products?isBestseller=true"
        />
        <StatCard
          title="On Sale"
          value={stats?.products.onSale || 0}
          icon={<Tag className="w-6 h-6" />}
          color="red"
          href="/admin/products?isOnSale=true"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Drops"
          value={stats?.drops.total || 0}
          icon={<Box className="w-6 h-6" />}
          color="purple"
          href="/admin/drops"
        />
        <StatCard
          title="Available Drops"
          value={stats?.drops.available || 0}
          icon={<Package className="w-6 h-6" />}
          color="green"
          href="/admin/drops?availability=avail"
        />
        <StatCard
          title="Coming Soon"
          value={stats?.drops.comingSoon || 0}
          icon={<Clock className="w-6 h-6" />}
          color="orange"
          href="/admin/drops?availability=soon"
        />
      </div>
    </div>
  );
}
