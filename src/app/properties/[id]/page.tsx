import { mockProperties } from '@/data/mockData';
import PropertyDetailsClient from './PropertyDetailsClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);
  
  if (!property) {
    return {
      title: 'Property Not Found | Elite Estates',
    };
  }

  return {
    title: `${property.title} - Luxury Portfolio | Elite Estates`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.title} | Elite Estates`,
      description: property.description.substring(0, 160),
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyPage({ params }: RouteParams) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailsClient property={property} />;
}
