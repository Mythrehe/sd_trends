import React from 'react';
import ProductClientPage from './ProductClientPage';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Resolve params if it's a promise (Next.js 15+ compatible), otherwise read directly
  const resolvedParams = 'then' in params ? await params : params;
  const { id } = resolvedParams;

  return <ProductClientPage productId={id} />;
}
