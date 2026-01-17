'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Drop, Availability } from '@/types/drop';
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
import { DropFilterPanel } from '@/components/admin/FilterPanel';
import SortControls from '@/components/admin/SortControls';
import DropForm from '@/components/admin/DropForm';
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

function AdminDropsContent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<{
    availability?: Availability;
  }>({
    availability: (searchParams.get('availability') as Availability) || undefined,
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'id');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'asc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [pageSize] = useState(10);

  // Modals refs
  const dropFormRef = useRef<HTMLDialogElement>(null);
  const imageModalRef = useRef<HTMLDialogElement>(null);

  const [editingDrop, setEditingDrop] = useState<Drop | undefined>();
  const [previewImage, setPreviewImage] = useState<{ url: string; alt: string } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 0);
  }, [search, filters, sortBy, order]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filters.availability) params.set('availability', filters.availability);
    if (sortBy !== 'id') params.set('sortBy', sortBy);
    if (order !== 'asc') params.set('order', order);
    if (page !== 1) params.set('page', String(page));
    params.set('pageSize', String(pageSize));

    router.replace(`/admin/drops?${params.toString()}`, { scroll: false });
  }, [search, filters, sortBy, order, page, pageSize, router]);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (filters.availability) params.append('availability', filters.availability);
    params.append('sortBy', sortBy);
    params.append('order', order);
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));
    return params.toString();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-drops', search, filters, sortBy, order, page, pageSize],
    queryFn: async () => {
      const res = await fetch(`/api/admin/drops?${buildQueryParams()}`);
      if (!res.ok) throw new Error('Failed to fetch drops');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/drops/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-drops'] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (drop: Partial<Drop>) => {
      const isEdit = !!editingDrop;
      const url = isEdit ? `/api/admin/drops/${editingDrop!.id}` : '/api/admin/drops';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drop),
      });
      if (!res.ok) throw new Error('Failed to save drop');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-drops'] });
      dropFormRef.current?.close();
      setEditingDrop(undefined);
    },
  });

  const openCreate = () => {
    setEditingDrop(undefined);
    dropFormRef.current?.showModal();
  };

  const openEdit = (drop: Drop) => {
    setEditingDrop(drop);
    dropFormRef.current?.showModal();
  };

  const openImagePreview = (url: string, alt: string) => {
    setPreviewImage({ url, alt });
    imageModalRef.current?.showModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this drop?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (filters.availability) params.append('availability', filters.availability);

    window.open(`/api/admin/export/drops?${params.toString()}`, '_blank');
  };

  const drops = data?.drops || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold uppercase" style={{ color: 'var(--admin-text)' }}>
          Drops Management
        </h1>
        <div className="flex gap-4">
          <Button onClick={handleExport} variant="ghost" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Button onClick={openCreate} variant="solid" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Drop
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search drops..." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <DropFilterPanel filters={filters} onChange={setFilters} />
          </div>
          <div className="lg:col-span-2">
            <SortControls
              sortBy={sortBy}
              order={order}
              sortOptions={[
                { value: 'id', label: 'ID' },
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'availability', label: 'Availability' },
              ]}
              onChange={(s, o) => {
                setSortBy(s);
                setOrder(o);
              }}
            />
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center py-12 text-[var(--admin-text-muted)]">Loading drops...</div>}

      {error && <div className="text-center py-12 text-red-400">Error loading drops. Please try again.</div>}

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
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Price</TableHead>
                <TableHead className="text-xs font-heading uppercase text-[var(--admin-text-muted)]">Availability</TableHead>
                <TableHead className="text-right text-xs font-heading uppercase text-[var(--admin-text-muted)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drops.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-[var(--admin-text-muted)]">
                    No drops found
                  </TableCell>
                </TableRow>
              ) : (
                drops.map((drop: Drop) => (
                  <TableRow
                    key={drop.id}
                    className="transition-colors hover:bg-[var(--admin-hover-bg)]"
                    style={{ borderBottomColor: 'var(--admin-border)' }}
                  >
                    <TableCell className="text-sm text-[var(--admin-text-muted)]">{drop.id}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => openImagePreview(drop.image, drop.name)}
                        className="relative w-16 h-20 rounded-lg overflow-hidden border border-[var(--admin-border)] hover:border-brand-green transition-colors group"
                      >
                        <Image src={drop.image} alt={drop.name} fill className="object-cover" sizes="64px" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[var(--admin-text)]">{drop.name}</TableCell>
                    <TableCell className="text-sm text-[var(--admin-text-muted)]">${drop.price}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${drop.availability === 'avail'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                      >
                        {drop.availability === 'avail' ? 'Available' : 'Coming Soon'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(drop)}
                          className="p-2 text-[var(--admin-text-muted)] hover:text-brand-green transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(drop.id)}
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
      <DropForm
        ref={dropFormRef}
        drop={editingDrop}
        onSave={saveMutation.mutateAsync}
      />

      <ImageModal
        ref={imageModalRef}
        id="drop-image-preview"
        imageUrl={previewImage?.url || ''}
        alt={previewImage?.alt || 'Drop image'}
      />
    </div>
  );
}

export default function AdminDropsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-[var(--admin-text-muted)]">Loading...</div>}>
      <AdminDropsContent />
    </Suspense>
  );
}