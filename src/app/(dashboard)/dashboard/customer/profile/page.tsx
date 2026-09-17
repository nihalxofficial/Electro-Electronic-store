import React from "react";
import CustomerProfileClient from "./CustomerProfileClient";
import { getUserSession } from "@/lib/core/session";
import { CustomerProfileData } from "@/types/customerDashboard";

// ── All Profile Data Kept In Page.tsx ──
const INITIAL_PROFILE_DATA: CustomerProfileData = {
  id: "user-cust-101",
  name: "Alex Rivera",
  firstName: "Alex",
  lastName: "Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 382-9102",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  birthDate: "1994-06-15",
  gender: "Male",
  bio: "Tech enthusiast, audiophile, and gadget collector.",
  memberSince: "January 2024",
  membershipTier: "Gold",
  addresses: [
    {
      id: "addr-1",
      title: "Home (Primary)",
      isDefault: true,
      recipientName: "Alex Rivera",
      phone: "+1 (555) 382-9102",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "Springfield",
      state: "OR",
      postalCode: "97477",
      country: "United States",
      type: "Shipping",
    },
    {
      id: "addr-2",
      title: "Office / Work",
      isDefault: false,
      recipientName: "Alex Rivera (Attn: Design Dept)",
      phone: "+1 (555) 382-9102",
      street: "100 Silicon Way",
      apartment: "Suite 300",
      city: "Portland",
      state: "OR",
      postalCode: "97201",
      country: "United States",
      type: "Both",
    },
  ],
};

async function getProfileData() {
  try {
    const session = await getUserSession();
    const user = session;
    if (user) {
      return {
        ...INITIAL_PROFILE_DATA,
        name: user.name || INITIAL_PROFILE_DATA.name,
        email: user.email || INITIAL_PROFILE_DATA.email,
        avatar: user.image || INITIAL_PROFILE_DATA.avatar,
      };
    }
    return INITIAL_PROFILE_DATA;
  } catch (error) {
    console.error("Failed to fetch customer profile:", error);
    return INITIAL_PROFILE_DATA;
  }
}

export default async function CustomerProfilePage() {
  const profileData = await getProfileData();
  return <CustomerProfileClient initialProfile={profileData} />;
}
