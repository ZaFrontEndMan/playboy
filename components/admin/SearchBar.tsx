'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        style={{ color: 'var(--admin-text-muted)' }}
      />
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4"
        style={{
          backgroundColor: 'var(--admin-input-bg)',
          borderColor: 'var(--admin-input-border)',
          color: 'var(--admin-text)',
        }}
      />
    </div>
  );
}

