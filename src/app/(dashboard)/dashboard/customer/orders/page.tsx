import React from "react";
import CustomerOrdersClient from "./CustomerOrdersClient";
import { CustomerOrder, CustomerOrderItem } from "@/types/customerDashboard";
import { getUserSession } from "@/lib/core/session";
import { getOrdersByUserId } from "@/lib/api/orders";

// ── Helpers ──────────────────────────────────────────────────────────────────

function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Map a backend orderStatus string to the CustomerOrder status union */
function mapOrderStatus(
  status: string
): CustomerOrder["status"] {
  const s = (status || "").toLowerCase();
  if (s === "shipped") return "Shipped";
  if (s === "delivered") return "Delivered";
  if (s === "cancelled") return "Cancelled";
  // "processing", "confirmed", or any other value → Processing
  return "Processing";
}

/** Map backend paymentMethod to a human-readable label */
function mapPaymentMethod(method: string): string {
  switch ((method || "").toLowerCase()) {
    case "bkash":  return "bKash";
    case "nagad":  return "Nagad";
    case "rocket": return "Rocket";
    case "cod":    return "Cash on Delivery";
    default:       return capitalizeFirst(method || "Unknown");
  }
}

/** Build a minimal timeline from the current orderStatus */
function buildTimeline(status: string, createdAt: string): CustomerOrder["timeline"] {
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const s = (status || "").toLowerCase();

  const steps: CustomerOrder["timeline"] = [
    {
      title: "Order Placed",
      date,
      completed: true,
      description: "Your order was received and is being processed.",
    },
  ];

  if (["shipped", "delivered"].includes(s)) {
    steps.push({
      title: "Processing Complete",
      date,
      completed: true,
      description: "Order verified and prepared for dispatch.",
    });
    steps.push({
      title: "Shipped",
      date: "",
      completed: s === "delivered",
      current: s === "shipped",
      description: "Package has been dispatched to carrier.",
    });
  }

  if (s === "delivered") {
    steps.push({
      title: "Delivered",
      date: "",
      completed: true,
      description: "Package delivered to shipping address.",
    });
  }

  if (s === "cancelled") {
    steps.push({
      title: "Order Cancelled",
      date,
      completed: true,
      description: "This order was cancelled.",
    });
  }

  if (s === "processing") {
    steps.push({
      title: "Processing",
      date,
      completed: false,
      current: true,
      description: "Order is being prepared for dispatch.",
    });
  }

  return steps;
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function CustomerOrdersPage() {
  const user = await getUserSession();

  let orders: CustomerOrder[] = [];

  if (user?.id) {
    try {
      const res = await getOrdersByUserId(user.id);
      // res can be { data: Order[] } or Order[] directly
      const rawOrders: any[] = Array.isArray(res?.data?.orders)
        ? res.data.orders
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

      orders = rawOrders.map((order: any): CustomerOrder => {
        const items: CustomerOrderItem[] = (order.items || []).map(
          (item: any, idx: number) => {
            // productId may be populated (object) or just an ID string
            const prod =
              typeof item.productId === "object" && item.productId !== null
                ? item.productId
                : null;

            const image =
              item.image ||
              prod?.image ||
              (Array.isArray(prod?.additionalImages) && prod.additionalImages[0]) ||
              "";

            const slug =
              prod?.slug ||
              (item.title || prod?.title || `item-${idx}`)
                .toLowerCase()
                .replace(/\s+/g, "-");

            return {
              id: item._id || `${order._id}-${idx}`,
              name: item.title || prod?.title || `Item #${idx + 1}`,
              slug,
              image,
              price: item.price ?? prod?.price ?? 0,
              quantity: item.quantity ?? 1,
            };
          }
        );

        const orderIdStr: string = order._id?.toString() || order.id || "";
        const shortId = orderIdStr.slice(-6).toUpperCase();

        const shippingAddr = order.shippingAddress
          ? `${order.shippingAddress.address}, ${order.shippingAddress.city} - ${order.shippingAddress.postalCode}`
          : "N/A";

        const status = mapOrderStatus(order.orderStatus || "processing");

        return {
          id: orderIdStr,
          orderNumber: `#ORD-${shortId}`,
          date: order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
          status,
          paymentStatus: "Paid",
          paymentMethod: mapPaymentMethod(order.paymentMethod),
          total: order.totalAmount ?? 0,
          itemCount: items.length,
          items,
          shippingAddress: shippingAddr,
          timeline: buildTimeline(order.orderStatus || "processing", order.createdAt),
        };
      });
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }

  return <CustomerOrdersClient initialOrders={orders} />;
}
