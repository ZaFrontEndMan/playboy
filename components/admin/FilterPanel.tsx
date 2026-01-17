'use client';

import { Category } from '@/types/product';
import { Availability } from '@/types/drop';
import { Label } from '@/components/ui/label';

interface ProductFilterPanelProps {
  filters: {
    category?: Category;
    isNew?: boolean;
    isBestseller?: boolean;
    isOnSale?: boolean;
  };
  onChange: (filters: any) => void;
}

interface DropFilterPanelProps {
  filters: {
    availability?: Availability;
  };
  onChange: (filters: any) => void;
}

export function ProductFilterPanel({ filters, onChange }: ProductFilterPanelProps) {
  const updateFilter = (key: string, value: any) => {
    onChange({ ...filters, [key]: value === '' ? undefined : value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Label 
          className="block text-sm font-heading uppercase mb-2"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          Category
        </Label>
        <select
          value={filters.category || ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
          style={{
            backgroundColor: 'var(--admin-input-bg)',
            borderColor: 'var(--admin-input-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--admin-text)',
          }}
        >
          <option value="">All</option>
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      <div className="flex items-center gap-2 w-full mt-8" >
        <label 
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <input
            type="checkbox"
            checked={filters.isNew || false}
            onChange={(e) => updateFilter('isNew', e.target.checked || undefined)}
            className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
            style={{
              borderColor: 'var(--admin-input-border)',
              backgroundColor: 'var(--admin-input-bg)',
            }}
          />
          New
        </label>
        <label 
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <input
            type="checkbox"
            checked={filters.isBestseller || false}
            onChange={(e) => updateFilter('isBestseller', e.target.checked || undefined)}
            className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
            style={{
              borderColor: 'var(--admin-input-border)',
              backgroundColor: 'var(--admin-input-bg)',
            }}
          />
          Bestseller
        </label>
        <label 
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <input
            type="checkbox"
            checked={filters.isOnSale || false}
            onChange={(e) => updateFilter('isOnSale', e.target.checked || undefined)}
            className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
            style={{
              borderColor: 'var(--admin-input-border)',
              backgroundColor: 'var(--admin-input-bg)',
            }}
          />
          On Sale
        </label>
      </div>
    </div>
  );
}

export function DropFilterPanel({ filters, onChange }: DropFilterPanelProps) {
  const updateFilter = (key: string, value: any) => {
    onChange({ ...filters, [key]: value === '' ? undefined : value });
  };

  return (
    <div>
        <Label 
          className="block text-sm font-heading uppercase mb-2"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          Availability
        </Label>
      <select
        value={filters.availability || ''}
        onChange={(e) => updateFilter('availability', e.target.value)}
        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:border-brand-green"
        style={{
          backgroundColor: 'var(--admin-input-bg)',
          borderColor: 'var(--admin-input-border)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: 'var(--admin-text)',
        }}
      >
        <option value="">All</option>
        <option value="avail">Available</option>
        <option value="soon">Coming Soon</option>
      </select>
    </div>
  );
}

