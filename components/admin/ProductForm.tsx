'use client';

import { forwardRef, useState } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Product, Category } from '@/types/product';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Partial<Product>) => Promise<void>;
}

const ProductForm = forwardRef<HTMLDialogElement, ProductFormProps>(
  ({ product, onSave }, ref) => {
    const [formData, setFormData] = useState({
      name: product?.name || "",
      price: product?.price || 0,
      image: product?.image || "",
      category: product?.category || ("top" as Category),
      description: product?.description || "",
      sizes: product?.sizes || [],
      colors: product?.colors || [],
      isNew: product?.isNew || false,
      isBestseller: product?.isBestseller || false,
      isOnSale: product?.isOnSale || false,
      salePrice: product?.salePrice || "",
      salePercentage: product?.salePercentage || "",
    });

    const [sizeInput, setSizeInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        await onSave({
          ...formData,
          salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
          salePercentage: formData.salePercentage ? Number(formData.salePercentage) : undefined,
        });
      } catch (error) {
        console.error("Failed to save product:", error);
      } finally {
        setLoading(false);
      }
    };

    const addSize = () => {
      if (sizeInput.trim()) {
        setFormData({ ...formData, sizes: [...formData.sizes, sizeInput.trim()] });
        setSizeInput("");
      }
    };

    const removeSize = (index: number) => {
      setFormData({ ...formData, sizes: formData.sizes.filter((_, i) => i !== index) });
    };

    const addColor = () => {
      if (colorInput.trim()) {
        setFormData({ ...formData, colors: [...formData.colors, colorInput.trim()] });
        setColorInput("");
      }
    };

    const removeColor = (index: number) => {
      setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
    };

    return (
      <Modal
        ref={ref}
        id="product-form-modal"
        title={product ? "Edit Product" : "Create Product"}
        size="xl" // wider for better spacing
      >
        <form onSubmit={handleSubmit} className="space-y-8 p-4 sm:p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                Name *
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-11"
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
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Image + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                Image URL *
              </Label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                Category *
              </Label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="
                  w-full h-11 px-4 rounded-lg
                  bg-[var(--admin-input-bg)]
                  border border-[var(--admin-input-border)]
                  text-[var(--admin-text)]
                  focus:outline-none focus:border-[var(--brand-green)]
                  focus:ring-1 focus:ring-[var(--brand-green)]/50
                "
              >
                <option value="top">Top</option>
                <option value="mid">Mid</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
              Description *
            </Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="
                w-full px-4 py-3 rounded-lg resize-none
                bg-[var(--admin-input-bg)]
                border border-[var(--admin-input-border)]
                text-[var(--admin-text)]
                focus:outline-none focus:border-[var(--brand-green)]
                focus:ring-1 focus:ring-[var(--brand-green)]/50
              "
              required
            />
          </div>

          {/* Sizes & Colors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sizes */}
            <div>
              <Label className="block text-sm font-heading uppercase mb-3 text-[var(--admin-text-muted)]">
                Sizes
              </Label>
              <div className="flex gap-3 mb-3">
                <Input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                  placeholder="Add size (e.g. M, XL)"
                  className="flex-1 h-11"
                />
                <Button type="button" onClick={addSize} variant="outline" size="sm" className="h-11 px-6">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {formData.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="
                      px-4 py-2 rounded-lg text-sm
                      bg-[var(--admin-input-bg)]
                      border border-[var(--admin-input-border)]
                      text-[var(--admin-text)]
                      flex items-center gap-2.5
                    "
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="text-[var(--destructive)] hover:text-[var(--destructive-foreground)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <Label className="block text-sm font-heading uppercase mb-3 text-[var(--admin-text-muted)]">
                Colors
              </Label>
              <div className="flex gap-3 mb-3">
                <Input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                  placeholder="Add color (e.g. Black, #FF5733)"
                  className="flex-1 h-11"
                />
                <Button type="button" onClick={addColor} variant="outline" size="sm" className="h-11 px-6">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {formData.colors.map((color, index) => (
                  <span
                    key={index}
                    className="
                      px-4 py-2 rounded-lg text-sm
                      bg-[var(--admin-input-bg)]
                      border border-[var(--admin-input-border)]
                      text-[var(--admin-text)]
                      flex items-center gap-2.5
                    "
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="text-[var(--destructive)] hover:text-[var(--destructive-foreground)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flags & Sale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--admin-border)]">
            <div className="space-y-5">
              <h4 className="text-lg font-heading font-semibold text-[var(--admin-text)]">
                Product Flags
              </h4>
              <label className="flex items-center gap-3 text-sm text-[var(--admin-text-muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[var(--admin-input-border)] text-[var(--brand-green)] focus:ring-[var(--brand-green)]"
                />
                Mark as New
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--admin-text-muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestseller}
                  onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[var(--admin-input-border)] text-[var(--brand-green)] focus:ring-[var(--brand-green)]"
                />
                Mark as Bestseller
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--admin-text-muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOnSale}
                  onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[var(--admin-input-border)] text-[var(--brand-green)] focus:ring-[var(--brand-green)]"
                />
                On Sale
              </label>
            </div>

            {formData.isOnSale && (
              <div className="space-y-6">
                <h4 className="text-lg font-heading font-semibold text-[var(--admin-text)]">
                  Sale Settings
                </h4>

                <div>
                  <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                    Sale Price {formData.salePercentage ? '(Auto-calculated)' : ''}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    readOnly={!!formData.salePercentage}
                    className="h-11"
                    placeholder={formData.salePercentage ? 'Auto-calculated' : 'Enter manually'}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-heading uppercase mb-2 text-[var(--admin-text-muted)]">
                    Sale Percentage (%)
                  </Label>
                  <Input
                    type="number"
                    value={formData.salePercentage}
                    onChange={(e) => {
                      const percentage = e.target.value;
                      const calculated = percentage && formData.price
                        ? (formData.price - (formData.price * parseFloat(percentage) / 100)).toFixed(2)
                        : '';
                      setFormData({
                        ...formData,
                        salePercentage: percentage,
                        salePrice: calculated,
                      });
                    }}
                    className="h-11"
                    placeholder="e.g. 20 for 20%"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[var(--admin-border)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => (ref as React.RefObject<HTMLDialogElement>)?.current?.close?.()}
              className="flex-1 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="solid"
              className="flex-1 h-12"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

ProductForm.displayName = 'ProductForm';

export default ProductForm;