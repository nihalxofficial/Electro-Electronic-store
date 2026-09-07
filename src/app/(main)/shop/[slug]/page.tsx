import { getProductBySlug } from "@/lib/api/products";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductNotFound from "./ProductNotFound";
import { ProductReview } from "@/types";
import { getUserSession } from "@/lib/core/session";

// Demo reviews placed here in page.tsx - easily replaceable with backend data later
const DEMO_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    userName: "Alex Johnson",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Exceptional build quality and crystal-clear acoustics! Exceeded my expectations for daily work and music playback.",
    date: "2 days ago",
  },
  {
    id: "rev-2",
    userName: "Sarah Miller",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Super comfortable to wear for long sessions. Battery life easily lasts throughout the week without charging.",
    date: "1 week ago",
  },
  {
    id: "rev-3",
    userName: "David Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    comment: "Great sound performance and fast pairing with multiple devices. Premium packaging and quick shipping.",
    date: "2 weeks ago",
  },
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductSlugPage({ params }: PageProps) {
  const { slug } = await params;

  let product = null;
  try {
    const res = await getProductBySlug(slug);
    product = res?.data ?? null;
  } catch {
    product = null;
  }

  if (!product) {
    return <ProductNotFound slug={slug} />;
  }

  const currentUser = await getUserSession();

  return (
    <ProductDetailsPage
      product={product}
      initialReviews={DEMO_REVIEWS}
      currentUser={currentUser}
    />
  );
}