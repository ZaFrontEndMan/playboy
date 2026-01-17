'use client';

import { forwardRef, useState } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Drop, Availability } from '@/types/drop';

export interface DropFormRef {
  showModal: () => void;
  closeModal: () => void;
}

interface DropFormProps {
  drop?: Drop;
  onSave: (drop: Partial<Drop>) => Promise<void>;
}

const DropForm = forwardRef<HTMLDialogElement, DropFormProps>(
  ({ drop, onSave }, ref) => {
    const [formData, setFormData] = useState({
      name: drop?.name || '',
      price: drop?.price || 0,
      image: drop?.image || '',
      description: drop?.description || '',
      sizes: drop?.sizes || [],
      availability: drop?.availability || 'avail' as Availability,
    });

    const [sizeInput, setSizeInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        await onSave(formData);
        // Modal will be closed by parent via ref
      } catch (error) {
        console.error('Failed to save drop:', error);
      } finally {
        setLoading(false);
      }
    };

    const addSize = () => {
      if (sizeInput.trim()) {
        setFormData({ ...formData, sizes: [...formData.sizes, sizeInput.trim()] });
        setSizeInput('');
      }
    };

    const removeSize = (index: number) => {
      setFormData({ ...formData, sizes: formData.sizes.filter((_, i) => i !== index) });
    };

    return (
      <Modal
        ref={ref}
        id="drop-form-modal"
        title={drop ? 'Edit Drop' : 'Create Drop'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                Name *
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                Price *
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
              Image URL *
            </Label>
            <Input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
              Availability *
            </Label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value as Availability })}
              className="w-full px-4 py-2 bg-[var(--admin-input-bg)] border border-[var(--admin-input-border)] rounded-lg text-[var(--admin-text)] focus:outline-none focus:border-brand-green"
            >
              <option value="avail">Available</option>
              <option value="soon">Coming Soon</option>
            </select>
          </div>

          <div>
            <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
              Description *
            </Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-[var(--admin-input-bg)] border border-[var(--admin-input-border)] rounded-lg text-[var(--admin-text)] focus:outline-none focus:border-brand-green resize-none"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
              Sizes
            </Label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                placeholder="Add size"
                className="flex-1"
              />
              <Button type="button" onClick={addSize} variant="ghost" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-lg text-sm flex items-center gap-2 bg-[var(--admin-input-bg)] border border-[var(--admin-input-border)] text-[var(--admin-text)]"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-[var(--admin-border)]">
            <Button
              type="button"
              variant="ghost"
              onClick={() => (ref as React.RefObject<HTMLDialogElement>)?.current?.close?.()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="solid" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

DropForm.displayName = 'DropForm';

export default DropForm;