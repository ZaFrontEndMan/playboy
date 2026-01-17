'use client';

import { Label } from '@/components/ui/label';

interface SortControlsProps {
  sortBy: string;
  order: 'asc' | 'desc';
  sortOptions: Array<{ value: string; label: string }>;
  onChange: (sortBy: string, order: 'asc' | 'desc') => void;
}

export default function SortControls({ sortBy, order, sortOptions, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Label 
          className="block text-sm font-heading uppercase mb-2"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          Sort By
        </Label>
        <select
          value={sortBy}
          onChange={(e) => onChange(e.target.value, order)}
          className="px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
          style={{
            backgroundColor: 'var(--admin-input-bg)',
            borderColor: 'var(--admin-input-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--admin-text)',
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label 
          className="block text-sm font-heading uppercase mb-2"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          Order
        </Label>
        <select
          value={order}
          onChange={(e) => onChange(sortBy, e.target.value as 'asc' | 'desc')}
          className="px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
          style={{
            backgroundColor: 'var(--admin-input-bg)',
            borderColor: 'var(--admin-input-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--admin-text)',
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

