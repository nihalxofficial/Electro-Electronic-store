import { getProductBySlug } from "@/lib/api/products";
import ProductDetailsPage from "./ProductDetailsPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getProductBySlug(slug);
  const product = res?.data;

  return <ProductDetailsPage product={product} />;
}