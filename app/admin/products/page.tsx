'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category } from '@/types/product';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SearchBar from '@/components/admin/SearchBar';
import { ProductFilterPanel } from '@/components/admin/FilterPanel';
import SortControls from '@/components/admin/SortControls';
import ProductForm from '@/components/admin/ProductForm';
import ImageModal from '@/components/admin/ImageModal';
import Image from 'next/image';
import { Edit, Trash2, Plus, Download, Eye } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function AdminProductsContent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<{
    category?: Category;
    isNew?: boolean;
    isBestseller?: boolean;
    isOnSale?: boolean;
  }>({
    category: (searchParams.get('category') as Category) || undefined,
    isNew: searchParams.get('isNew') === 'true' ? true : undefined,
    isBestseller: searchParams.get('isBestseller') === 'true' ? true : undefined,
    isOnSale: searchParams.get('isOnSale') === 'true' ? true : undefined,
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'id');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'asc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [pageSize] = useState(10);

  // Modals refs
  const productFormRef = useRef<HTMLDialogElement>(null);
  const imageModalRef = useRef<HTMLDialogElement>(null);

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [previewImage, setPreviewImage] = useState<{ url: string; alt: string } | null>(null);

  // Reset page when filters/sort change
  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 0);
  }, [search, filters, sortBy, order]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filters.category) params.set('category', filters.category);
    if (filters.isNew !== undefined) params.set('isNew', String(filters.isNew));
    if (filters.isBestseller !== undefined) params.set('isBestseller', String(filters.isBestseller));
    if (filters.isOnSale !== undefined) params.set('isOnSale', String(filters.isOnSale));
    if (sortBy !== 'id') params.set('sortBy', sortBy);
    if (order !== 'asc') params.set('order', order);
    if (page !== 1) params.set('page', String(page));
    params.set('pageSize', String(pageSize));

    router.replace(`/admin/products?${params.toString()}`, { scroll: false });
  }, [search, filters, sortBy, order, page, pageSize, router]);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (filters.category) params.append('category', filters.category);
    if (filters.isNew !== undefined) params.append('isNew', String(filters.isNew));
    if (filters.isBestseller !== undefined) params.append('isBestseller', String(filters.isBestseller));
    if (filters.isOnSale !== undefined) params.append('isOnSale', String(filters.isOnSale));
    params.append('sortBy', sortBy);
    params.append('order', order);
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));
    return params.toString();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-products', search, filters, sortBy, order, page, pageSize],
    queryFn: async () => {
      const res = await fetch(`/api/admin/products?${buildQueryParams()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      const isEdit = !!editingProduct;
      const url = isEdit ? `/api/admin/products/${editingProduct!.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to save product');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      productFormRef.current?.close();
      setEditingProduct(undefined);
    },
  });

  const openCreate = () => {
    setEditingProduct(undefined);
    productFormRef.current?.showModal();
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    productFormRef.current?.showModal();
  };

  const openImagePreview = (url: string, alt: string) => {
    setPreviewImage({ url, alt });
    imageModalRef.current?.showModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (filters.category) params.append('category', filters.category);
    if (filters.isNew !== undefined) params.append('isNew', String(filters.isNew));
    if (filters.isBestseller !== undefined) params.append('isBestseller', String(filters.isBestseller));
    if (filters.isOnSale !== undefined) params.append('isOnSale', String(filters.isOnSale));
    window.open(`/api/admin/export/products?${params.toString()}`, '_blank');
  };

  const products = data?.products || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold uppercase" style={{ color: 'var(--admin-text)' }}>
          Products Management
        </h1>
        <div className="flex gap-4">
          <Button onClick={handleExport} variant="ghost" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Button onClick={openCreate} variant="solid" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Product
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ProductFilterPanel filters={filters} onChange={setFilters} />
          </div>
          <div>
            <SortControls
              sortBy={sortBy}
              order={order}
              sortOptions={[
                { value: 'id', label: 'ID' },
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'category', label: 'Category' },
              ]}
              onChange={(s, o) => {
                setSortBy(s);
                setOrder(o);
              }}
            />
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center py-12 text-[var(--admin-text-muted)]">Loading products...</div>}

      {error && <div className="text-center py-12 text-red-400">Error loading products. Please try again.</div>}

      {!isLoading && !error && (
        <div
          className="rounded-lg overflow-hidden border border-[var(--admin-border)]"
          style={{ backgroundColor: 'var(--admin-card-bg)' }}
        >
          <Table>
            <TableHeader style={{ backgroundColor: 'var(--admin-hover-bg)' }}>
              <TableRow style={{ borderBottomColor: 'var(--admin-border)' }}>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">ID</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Image</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Name</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Category</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Price</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Sale Price</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Flags</TableHead>
                <TableHead className="text-right text-xs font-heading uppercase text-[var(--admin-text-muted)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-[var(--admin-text-muted)]">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product: Product) => (
                  <TableRow
                    key={product.id}
                    className="transition-colors hover:bg-[var(--admin-hover-bg)]"
                    style={{ borderBottomColor: 'var(--admin-border)' }}
                  >
                    <TableCell className="text-sm text-[var(--admin-text-muted)]">{product.id}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => openImagePreview(product.image, product.name)}
                        className="relative w-16 h-20 rounded-lg overflow-hidden border border-[var(--admin-border)] hover:border-brand-green transition-colors group"
                      >
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[var(--admin-text)]">{product.name}</TableCell>
                    <TableCell className="text-sm uppercase text-[var(--admin-text-muted)]">{product.category}</TableCell>
                    <TableCell className="text-sm text-[var(--admin-text-muted)]">${product.price}</TableCell>
                    <TableCell className="text-sm text-[var(--admin-text-muted)]">
                      {product.salePrice ? `$${product.salePrice}` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {product.isNew && <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">New</span>}
                        {product.isBestseller && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Best</span>}
                        {product.isOnSale && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Sale</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 text-[var(--admin-text-muted)] hover:text-brand-green transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-[var(--admin-text-muted)] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && pagination?.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination?.hasPreviousPage) setPage(page - 1);
                  }}
                  className={!pagination?.hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNum);
                        }}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (pageNum === page - 2 || pageNum === page + 2) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination?.hasNextPage) setPage(page + 1);
                  }}
                  className={!pagination?.hasNextPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Always rendered modals */}
      <ProductForm
        ref={productFormRef}
        product={editingProduct}
        onSave={saveMutation.mutateAsync}
      />

      <ImageModal
        ref={imageModalRef}
        id="product-image-preview"
        imageUrl={previewImage?.url || ''}
        alt={previewImage?.alt || 'Product image'}
      />
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-[var(--admin-text-muted)]">Loading...</div>}>
      <AdminProductsContent />
    </Suspense>
  );
}