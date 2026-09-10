import { getProductBySlug } from "@/lib/api/products";
import { getReviewsByProductId } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductNotFound from "./ProductNotFound";

export default async function ProductSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productRes = await getProductBySlug(slug);
  const product = productRes?.data;

  if (!product) return <ProductNotFound slug={slug} />;

  const [currentUser, reviewsRes] = await Promise.all([
    getUserSession(),
    getReviewsByProductId(product.id),
  ]);

  return (
    <ProductDetailsPage
      product={product}
      initialReviews={reviewsRes?.data?.reviews ?? []}
      currentUser={currentUser}
    />
  );
}
