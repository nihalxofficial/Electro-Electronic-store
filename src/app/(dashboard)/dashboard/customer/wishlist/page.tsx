import React from "react";
import CustomerWishlistClient from "./CustomerWishlistClient";
import { getWishlistByUserId } from "@/lib/api/wishlist";
import { getUserSession } from "@/lib/core/session";

export default async function CustomerWishlistPage() {
  const user = await getUserSession();
  const res = user?.id ? await getWishlistByUserId(user.id) : null;
  const rawItems = res?.data?.items || (Array.isArray(res?.data) ? res.data : []);

  const items = rawItems
    .filter((item: any) => item?.productId)
    .map((item: any) => {
      const p = item.productId;
      return {
        id: item._id,
        productId: p._id || p.id,
        title: p.title,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        discountPercentage:
          p.originalPrice && p.originalPrice > p.price
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : undefined,
        image: p.image,
        inStock: p.inStock ?? true,
        rating: p.rating || 5,
        category: p.category?.name || "Electronics",
        addedAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "",
      };
    });

  return <CustomerWishlistClient initialItems={items} />;
}
