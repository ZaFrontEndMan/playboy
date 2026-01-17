import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DropDetailClient from '@/components/DropDetailClient';
import { getDropById } from '@/lib/drops';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const drop = getDropById(parseInt(id, 10));

  if (!drop) {
    return {
      title: 'Drop Not Found - FUTUREWEAR',
    };
  }

  return {
    title: `${drop.name} - FUTUREWEAR`,
    description: drop.description,
  };
}

export default async function DropDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dropId = parseInt(id, 10);

  if (isNaN(dropId)) {
    notFound();
  }

  const drop = getDropById(dropId);

  if (!drop) {
    notFound();
  }

  return (
    <main className="relative min-h-screen">
      <DropDetailClient drop={drop} />
    </main>
  );
}






