import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout file is required by Next.js App Router
  // The actual layout logic is in AdminLayoutWrapper
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

