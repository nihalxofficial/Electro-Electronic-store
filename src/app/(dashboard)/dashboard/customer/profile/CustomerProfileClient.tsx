"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  Button,
  Input,
  TextArea,
  Chip,
} from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Sparkles,
  Camera,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { CustomerProfileData, CustomerAddress } from "@/types/customerDashboard";

interface CustomerProfileClientProps {
  initialProfile: CustomerProfileData;
}

export default function CustomerProfileClient({
  initialProfile,
}: CustomerProfileClientProps) {
  const { data: session } = authClient.useSession();
  const sessionUser = session?.user;

  const [profile, setProfile] = useState<CustomerProfileData>({
    ...initialProfile,
    name: sessionUser?.name || initialProfile.name,
    email: sessionUser?.email || initialProfile.email,
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Address form inputs
  const [addrTitle, setAddrTitle] = useState("");
  const [addrRecipient, setAddrRecipient] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrApt, setAddrApt] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrZip, setAddrZip] = useState("");
  const [addrCountry, setAddrCountry] = useState("United States");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile information updated successfully!");
  };

  const handleAvatarChange = () => {
    toast.info("Avatar update simulated! Uploading image...");
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddrTitle("Home");
    setAddrRecipient(profile.name);
    setAddrPhone(profile.phone);
    setAddrStreet("");
    setAddrApt("");
    setAddrCity("");
    setAddrState("");
    setAddrZip("");
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: CustomerAddress) => {
    setEditingAddressId(addr.id);
    setAddrTitle(addr.title);
    setAddrRecipient(addr.recipientName);
    setAddrPhone(addr.phone);
    setAddrStreet(addr.street);
    setAddrApt(addr.apartment || "");
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrZip(addr.postalCode);
    setAddrCountry(addr.country);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrZip) {
      toast.error("Please fill in required address fields.");
      return;
    }

    if (editingAddressId) {
      setProfile((prev) => ({
        ...prev,
        addresses: prev.addresses.map((addr) =>
          addr.id === editingAddressId
            ? {
                ...addr,
                title: addrTitle,
                recipientName: addrRecipient,
                phone: addrPhone,
                street: addrStreet,
                apartment: addrApt,
                city: addrCity,
                state: addrState,
                postalCode: addrZip,
                country: addrCountry,
              }
            : addr
        ),
      }));
      toast.success("Address updated!");
    } else {
      const newAddr: CustomerAddress = {
        id: `addr-${Date.now()}`,
        title: addrTitle || "New Address",
        isDefault: profile.addresses.length === 0,
        recipientName: addrRecipient,
        phone: addrPhone,
        street: addrStreet,
        apartment: addrApt,
        city: addrCity,
        state: addrState,
        postalCode: addrZip,
        country: addrCountry,
        type: "Shipping",
      };
      setProfile((prev) => ({
        ...prev,
        addresses: [...prev.addresses, newAddr],
      }));
      toast.success("New address added!");
    }

    setIsAddressModalOpen(false);
  };

  const handleSetDefaultAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    }));
    toast.success("Default shipping address set.");
  };

  const handleDeleteAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
    toast.info("Address removed.");
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
          <Link href="/dashboard/customer" className="hover:text-sky-600 transition-colors">
            Customer Dashboard
          </Link>
          <span>/</span>
          <span className="text-sky-600 dark:text-sky-400">Profile</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Account{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal details, saved shipping addresses, and membership info.
        </p>
      </div>

      {/* ── Profile Header Card ── */}
      <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with upload badge */}
          <div className="relative group shrink-0">
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 p-1 shadow-md overflow-hidden">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover rounded-[22px]"
                unoptimized
              />
            </div>
            <button
              onClick={handleAvatarChange}
              title="Change Avatar"
              className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Meta */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                Verified Customer
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40">
                <Sparkles className="w-3.5 h-3.5" />
                {profile.membershipTier} Member
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Member since {profile.memberSince}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Main Content: Personal Details & Address Book ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Form */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Update your basic details used for order confirmations
            </p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <Input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <Input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-100 dark:bg-gray-800/60 text-gray-500 cursor-not-allowed text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) =>
                    setProfile({ ...profile, birthDate: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gender: e.target.value as CustomerProfileData["gender"],
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                Short Bio / Notes
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all shadow-xs cursor-pointer h-10"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Saved Addresses Book */}
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Address Book
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage shipping &amp; delivery addresses
                </p>
              </div>
              <Button
                size="sm"
                isIconOnly
                onClick={handleOpenAddAddress}
                className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 transition-colors h-8 w-8 min-w-0"
                aria-label="Add Address"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 mt-4">
              {profile.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-4 rounded-xl border transition-all space-y-2 ${
                    addr.isDefault
                      ? "border-sky-500/50 bg-sky-50/20 dark:bg-sky-950/20"
                      : "border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-950/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {addr.title}
                      </span>
                    </div>

                    {addr.isDefault && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">
                    {addr.recipientName}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                    {addr.street} {addr.apartment ? `, ${addr.apartment}` : ""}
                    <br />
                    {addr.city}, {addr.state} {addr.postalCode} • {addr.country}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[11px]">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer"
                      >
                        Set Default
                      </button>
                    ) : (
                      <span className="text-gray-400">Primary</span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditAddress(addr)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {profile.addresses.length > 1 && (
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-gray-400 hover:text-rose-600 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleOpenAddAddress}
            variant="outline"
            className="w-full py-2.5 rounded-xl border border-dashed border-sky-300 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 text-xs font-bold text-center block transition-colors cursor-pointer mt-4 h-10"
          >
            + Add Another Address
          </Button>
        </Card>
      </div>

      {/* ── Address Add / Edit Modal ── */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <Card className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h3>
              <Button
                size="sm"
                isIconOnly
                variant="ghost"
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold h-8 w-8 min-w-0"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    Label / Title
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Home, Office"
                    value={addrTitle}
                    onChange={(e) => setAddrTitle(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    Recipient Full Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={addrRecipient}
                    onChange={(e) => setAddrRecipient(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Street Address
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Street name and house number"
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    Apt / Suite
                  </label>
                  <Input
                    type="text"
                    placeholder="Apt 4B"
                    value={addrApt}
                    onChange={(e) => setAddrApt(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="City"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    State / Zip
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="OR 97477"
                    value={addrZip}
                    onChange={(e) => setAddrZip(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 font-semibold h-9 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all cursor-pointer h-9 text-xs"
                >
                  Save Address
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
