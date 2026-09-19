import React from "react";
import CheckoutClient from "./CheckoutClient";
import { getCartByUserId } from "@/lib/api/cart";
import { getUserSession } from "@/lib/core/session";
import { CartData } from "@/types";

export const metadata = {
  title: "Checkout | Electro",
  description:
    "Complete your order securely with Electro. Enter your shipping address and choose from Cash on Delivery or instant mobile wallet payments (bKash, Rocket, Nagad).",
};

export default async function CheckoutPage() {
  const user = await getUserSession();
  let initialCart: CartData | null = null;

  if (user?.id) {
    try {
      const res = await getCartByUserId(user.id);
      if (res?.success && res.data) {
        initialCart = res.data;
      }
    } catch {
      // Unauthenticated or backend unavailable during SSR
    }
  }

  return <CheckoutClient initialCart={initialCart} user={user} />;
}
