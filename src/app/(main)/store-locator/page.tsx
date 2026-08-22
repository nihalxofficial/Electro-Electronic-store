"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Navigation,
  Store,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { StoreLocation } from "@/types/storeLocator";



const STORES_DATA: StoreLocation[] = [
  {
    id: "london-flagship",
    name: "Electro Flagship Store",
    address: "17 Princess Road, Regent's Park",
    city: "London",
    state: "Greater London",
    zip: "NW1 8JR",
    phone: "(800) 8001-8588",
    distance: "0.8 miles",
    isOpen: true,
    hours: "Mon - Sat: 9:00 AM - 9:00 PM | Sun: 10:00 AM - 6:00 PM",
    services: ["In-Store Pickup", "Tech Support Bar", "Same-Day Repair", "Demo Zone"],
    lat: 51.535,
    lng: -0.155,
  },
  {
    id: "oxford-street",
    name: "Electro Oxford Street",
    address: "221 Oxford Street",
    city: "London",
    state: "Greater London",
    zip: "W1D 2HG",
    phone: "(0600) 874 548",
    distance: "2.4 miles",
    isOpen: true,
    hours: "Mon - Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 5:00 PM",
    services: ["In-Store Pickup", "Demo Zone"],
    lat: 51.515,
    lng: -0.141,
  },
  {
    id: "westfield-stratford",
    name: "Electro Westfield Stratford",
    address: "Montfichet Road, Olympic Park",
    city: "London",
    state: "Greater London",
    zip: "E20 1EJ",
    phone: "(0600) 874 990",
    distance: "5.7 miles",
    isOpen: false,
    hours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 12:00 PM - 6:00 PM",
    services: ["In-Store Pickup", "Tech Support Bar", "Same-Day Repair"],
    lat: 51.543,
    lng: -0.006,
  },
  {
    id: "manchester-arndale",
    name: "Electro Manchester Arndale",
    address: "Exchange Court, Market Street",
    city: "Manchester",
    state: "Greater Manchester",
    zip: "M4 3AQ",
    phone: "(0161) 992 0110",
    distance: "184 miles",
    isOpen: true,
    hours: "Mon - Sat: 9:00 AM - 8:00 PM | Sun: 11:00 AM - 5:00 PM",
    services: ["In-Store Pickup", "Tech Support Bar"],
    lat: 53.483,
    lng: -2.242,
  },
];

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<string>(STORES_DATA[0].id);

  // Filter stores based on search query
  const filteredStores = useMemo(() => {
    return STORES_DATA.filter((store) => {
      const q = searchQuery.toLowerCase();
      return (
        store.name.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.zip.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const activeStore = useMemo(() => {
    return STORES_DATA.find((s) => s.id === selectedStoreId) || filteredStores[0] || STORES_DATA[0];
  }, [selectedStoreId, filteredStores]);

  return (
    <section className="w-full text-gray-800 dark:text-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* ── Page Header ── */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/50 text-xs font-semibold tracking-wide uppercase">
            <Store className="w-4 h-4 stroke-[2.2]" />
            Find Us Nearby
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Store <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Locator</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Find an Electro retail outlet near you to experience the latest gadgets, pick up online orders, or get instant technical support.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, address, or postal code (e.g. London, NW1)..."
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-xs placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* ── Main Interactive Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store Cards Sidebar (Span 5) */}
          <div className="lg:col-span-5 space-y-4 max-h-[680px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
              <span>Results ({filteredStores.length})</span>
              <span>Distance</span>
            </div>

            {filteredStores.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center space-y-3">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
                <h3 className="font-bold text-gray-800 dark:text-gray-200">No Stores Found</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We couldn't find any stores matching "{searchQuery}". Try searching for another location.
                </p>
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSelected = store.id === activeStore.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                      isSelected
                        ? "bg-white dark:bg-gray-900 border-sky-500 dark:border-sky-500 shadow-md ring-2 ring-sky-500/20"
                        : "bg-white/60 dark:bg-gray-900/60 border-gray-200/80 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                          {store.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {store.address}, {store.city} {store.zip}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 shrink-0 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-100 dark:border-sky-900/40">
                        {store.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-xs">
                      {/* Status Badge */}
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        store.isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                      }`}>
                        {store.isOpen ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Open Now</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Closed Now</span>
                          </>
                        )}
                      </span>

                      <span className="text-gray-400">|</span>

                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        {store.phone}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Active Store Map Preview & Full Details (Span 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
            
            {/* Map Placeholder Box */}
            <div className="relative w-full h-64 md:h-72 bg-slate-100 dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800 flex flex-col items-center justify-center p-6 text-center group">
              {/* Decorative Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    {activeStore.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {activeStore.address}, {activeStore.city}, {activeStore.state} {activeStore.zip}
                  </p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${activeStore.address}, ${activeStore.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-sky-600 dark:hover:bg-sky-400 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Store Detailed Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Working Hours */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>Opening Hours</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-slate-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  {activeStore.hours}
                </p>
              </div>

              {/* Available Store Services */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  <Store className="w-4 h-4 text-sky-500" />
                  <span>Services Available</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeStore.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}