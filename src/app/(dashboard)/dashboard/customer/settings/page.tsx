import React from "react";
import CustomerSettingsClient, {
  CustomerSettingsData,
} from "./CustomerSettingsClient";

// ── All Settings Dummy/Default Data Kept In Page.tsx ──
const INITIAL_SETTINGS_DATA: CustomerSettingsData = {
  preferences: {
    currency: "USD",
    language: "en",
  },
  notifications: {
    notifOrdersEmail: true,
    notifOrdersSms: true,
    notifPromosEmail: false,
    notifPromosSms: false,
    notifNewsletter: true,
  },
  security: {
    twoFactor: false,
    activeSessions: [
      {
        id: "sess-1",
        device: "Windows PC (Chrome 124)",
        location: "Springfield, OR, USA",
        lastActive: "Active Now",
        isCurrent: true,
      },
      {
        id: "sess-2",
        device: "iPhone 15 Pro (Safari Mobile)",
        location: "Portland, OR, USA",
        lastActive: "2 hours ago",
        isCurrent: false,
      },
    ],
  },
};

async function getSettingsData() {
  try {
    return INITIAL_SETTINGS_DATA;
  } catch (error) {
    console.error("Failed to fetch customer settings:", error);
    return INITIAL_SETTINGS_DATA;
  }
}

export default async function CustomerSettingsPage() {
  const settingsData = await getSettingsData();
  return <CustomerSettingsClient initialSettings={settingsData} />;
}
