// ─── Store Locator Page Specific Types ─────────────────────────────────────────

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string; // e.g., "1.2 miles"
  isOpen: boolean;
  hours: string;
  services: string[];
  lat: number;
  lng: number;
}
