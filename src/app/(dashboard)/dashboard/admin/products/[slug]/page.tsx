import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api/products";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const productRes = await getProductBySlug(slug);

  const product = productRes?.data || productRes;

  if (!product || !product.title) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
