import { getProductBySlug } from "@/lib/api/products";
import { getReviewsByProductId } from "@/lib/api/reviews";
import { getOrdersByUserId } from "@/lib/api/orders";
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

  // Check if current user bought this product from their orders
  let hasPurchased = false;
  if (currentUser?.id) {
    const ordersRes = await getOrdersByUserId(currentUser.id);
    const orders = ordersRes?.data?.orders || ordersRes?.data || [];
    hasPurchased = orders.some((order: any) =>
      order.items?.some(
        (item: any) =>
          String(item.productId?._id || item.productId?.id || item.productId) === String(product.id)
      )
    );
  }

  return (
    <ProductDetailsPage
      product={product}
      initialReviews={reviewsRes?.data?.reviews ?? []}
      currentUser={currentUser}
      hasPurchased={hasPurchased}
    />
  );
}