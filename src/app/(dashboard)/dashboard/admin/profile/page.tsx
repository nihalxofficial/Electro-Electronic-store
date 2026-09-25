import React from "react";
import AdminProfileClient, { AdminProfileData } from "./AdminProfileClient";
import { getUserSession } from "@/lib/core/session";

const INITIAL_ADMIN_PROFILE: AdminProfileData = {
  id: "admin-user",
  name: "System Administrator",
  firstName: "System",
  lastName: "Administrator",
  email: "admin@electro.com",
  phone: "+1 (555) 019-2834",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  role: "Administrator",
  department: "Management & Operations",
  bio: "Senior Store Administrator overseeing product catalog, user management, and order fulfillment.",
  joinedDate: "January 2024",
};

async function getAdminProfileData(): Promise<AdminProfileData> {
  try {
    const session = await getUserSession();
    if (session) {
      const nameParts = (session.name || "Administrator").split(" ");
      const firstName = nameParts[0] || "System";
      const lastName = nameParts.slice(1).join(" ") || "Admin";

      return {
        ...INITIAL_ADMIN_PROFILE,
        id: session.id || INITIAL_ADMIN_PROFILE.id,
        name: session.name || INITIAL_ADMIN_PROFILE.name,
        firstName,
        lastName,
        email: session.email || INITIAL_ADMIN_PROFILE.email,
        avatar: session.image || INITIAL_ADMIN_PROFILE.avatar,
        role: (session as { role?: string })?.role || "admin",
      };
    }
    return INITIAL_ADMIN_PROFILE;
  } catch (error) {
    console.error("Failed to fetch admin profile:", error);
    return INITIAL_ADMIN_PROFILE;
  }
}

export default async function AdminProfilePage() {
  const profileData = await getAdminProfileData();
  return <AdminProfileClient initialProfile={profileData} />;
}
