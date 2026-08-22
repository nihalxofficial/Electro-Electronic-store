"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  Input,
  TextArea,
  Button,
  Select,
  ListBox,
  Switch,
} from "@heroui/react";
import {
  PackagePlus,
  ImageIcon,
  X,
  Plus,
  Trash2,
  Check,
  DollarSign,
  Layers,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types";

// ─── Mock Category & Subcategory Data ───────────────────────────────────────────
const AVAILABLE_CATEGORIES = [
  { id: "laptops-computers", label: "Laptops & Computers" },
  { id: "audio-wearables", label: "Audio & Wearables" },
  { id: "gaming-consoles", label: "Gaming Consoles" },
  { id: "smartphones-tablets", label: "Smartphones & Tablets" },
  { id: "accessories", label: "Accessories" },
  { id: "headphone-cases", label: "Headphone Cases" },
];

const MOCK_SUBCATEGORIES_BY_CATEGORY: Record<
  string,
  { id: string; label: string }[]
> = {
  "laptops-computers": [
    { id: "gaming-laptops", label: "Gaming Laptops" },
    { id: "ultrabooks", label: "Ultrabooks & Thin Laptops" },
    { id: "macbooks", label: "MacBooks" },
    { id: "desktop-pcs", label: "Desktop PCs & Workstations" },
    { id: "monitors", label: "Monitors & Displays" },
  ],
  "audio-wearables": [
    { id: "wireless-earbuds", label: "Wireless Earbuds" },
    { id: "over-ear-headphones", label: "Over-Ear Headphones" },
    { id: "smartwatches", label: "Smartwatches" },
    { id: "bluetooth-speakers", label: "Bluetooth Speakers" },
  ],
  "gaming-consoles": [
    { id: "ps5", label: "PlayStation 5" },
    { id: "xbox-series", label: "Xbox Series X/S" },
    { id: "nintendo-switch", label: "Nintendo Switch" },
    { id: "handheld-consoles", label: "Handheld Gaming Consoles" },
  ],
  "smartphones-tablets": [
    { id: "iphones", label: "iPhones" },
    { id: "android-phones", label: "Android Smartphones" },
    { id: "ipads", label: "iPads" },
    { id: "android-tablets", label: "Android Tablets" },
  ],
  accessories: [
    { id: "cables-adapters", label: "Cables & Adapters" },
    { id: "chargers-powerbanks", label: "Fast Chargers & Powerbanks" },
    { id: "stands-mounts", label: "Stands & Mounts" },
    { id: "keyboards-mice", label: "Keyboards & Mice" },
  ],
  "headphone-cases": [
    { id: "hardshell-cases", label: "Hard Shell Cases" },
    { id: "silicone-sleeves", label: "Silicone Sleeves" },
    { id: "leather-pouches", label: "Leather Pouches" },
  ],
};

const AVAILABLE_BADGES = [
  { id: "new", label: "New" },
  { id: "hot", label: "Hot" },
  { id: "sale", label: "Sale" },
  { id: "best-seller", label: "Best Seller" },
  { id: "featured", label: "Featured" },
];

// ─── Slug Generator ─────────────────────────────────────────────────────────────
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ─── Types ───────────────────────────────────────────────────────────────────────
interface SpecRow {
  key: string;
  value: string;
}

// ─── Page Component ─────────────────────────────────────────────────────────────
export default function AddProductPage() {
  // ── Form state (all controlled) ──
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    price: "",
    originalPrice: "",
    discountPercentage: "",
    stockQuantity: "",
    sku: "",
    description: "",
    inStock: true,
    isFeatured: false,
  });

  // Category & Subcategory selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<Set<string>>(
    new Set()
  );

  // Badges state
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(new Set());

  // Image URL state
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([""]);

  // Specifications state
  const [specifications, setSpecifications] = useState<SpecRow[]>([
    { key: "Brand", value: "" },
  ]);

  // Dynamically available subcategories based on selected category
  const availableSubCategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    return MOCK_SUBCATEGORIES_BY_CATEGORY[selectedCategoryId] || [];
  }, [selectedCategoryId]);

  // ── Category Change Handler (Prepared for API Integration) ──
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    // Reset subcategories when category changes
    setSelectedSubCategoryIds(new Set());

    // 💡 Ready for API: Selected Category ID captured to fetch subcategories from backend
    console.log("Selected Category ID for Subcategories API:", categoryId);
  };

  // ── Handlers ──
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormState((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handlePriceChange = (priceVal: string, origVal: string) => {
    const p = parseFloat(priceVal);
    const op = parseFloat(origVal);
    const discount =
      p && op && op > p ? Math.round(((op - p) / op) * 100).toString() : "";
    setFormState((prev) => ({
      ...prev,
      price: priceVal,
      originalPrice: origVal,
      discountPercentage: discount,
    }));
  };

  const addAdditionalImage = () =>
    setAdditionalImageUrls((prev) => [...prev, ""]);

  const updateAdditionalImage = (index: number, url: string) =>
    setAdditionalImageUrls((prev) =>
      prev.map((u, i) => (i === index ? url : u))
    );

  const removeAdditionalImage = (index: number) =>
    setAdditionalImageUrls((prev) => prev.filter((_, i) => i !== index));

  const addSpecification = () =>
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    val: string
  ) =>
    setSpecifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );

  const removeSpecification = (index: number) =>
    setSpecifications((prev) => prev.filter((_, i) => i !== index));

  // ── Submit using Object.fromEntries ──
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    // Build specifications record from state
    const specsRecord: Record<string, string> = {};
    specifications.forEach((spec) => {
      if (spec.key.trim()) specsRecord[spec.key.trim()] = spec.value.trim();
    });

    const price = parseFloat(String(raw.price)) || 0;
    const originalPrice = raw.originalPrice
      ? parseFloat(String(raw.originalPrice))
      : undefined;
    const discountPct = raw.discountPercentage
      ? parseFloat(String(raw.discountPercentage))
      : undefined;

    // Resolve category names
    const categoryName =
      AVAILABLE_CATEGORIES.find((c) => c.id === selectedCategoryId)?.label ??
      selectedCategoryId;

    const subCategoryNames = Array.from(selectedSubCategoryIds).map((subId) => {
      return (
        availableSubCategories.find((s) => s.id === subId)?.label ?? subId
      );
    });

    const allCategoriesList = [
      categoryName,
      ...subCategoryNames,
    ].filter(Boolean);

    const result: Partial<Product> & {
      categoryId?: string;
      subCategoryIds?: string[];
    } = {
      title: String(raw.title ?? ""),
      slug: String(raw.slug ?? ""),
      categoryId: selectedCategoryId,
      subCategoryIds: Array.from(selectedSubCategoryIds),
      categories: allCategoriesList,
      price,
      originalPrice,
      discountPercentage: discountPct,
      image: String(raw.mainImage ?? ""),
      additionalImages: additionalImageUrls.filter(Boolean),
      inStock: formState.inStock,
      stockQuantity: raw.stockQuantity
        ? parseInt(String(raw.stockQuantity), 10)
        : undefined,
      badges: Array.from(selectedBadges).map((id) =>
        AVAILABLE_BADGES.find((b) => b.id === id)?.label ?? id
      ) as Product["badges"],
      sku: String(raw.sku ?? "") || undefined,
      description: String(raw.description ?? "") || undefined,
      specifications: Object.keys(specsRecord).length ? specsRecord : undefined,
      isFeatured: formState.isFeatured,
    };

    console.log("Product Form Data (Object.fromEntries):", result);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Add New{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Product
          </span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create a product entry mapped to your standard Product interface type.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Main Info Column ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-5">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <PackagePlus className="w-4 h-4 text-sky-500" />
                  General Information
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    name="title"
                    placeholder="e.g. Premium Noise-Canceling Earbud Case"
                    value={formState.title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Slug <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    name="slug"
                    placeholder="premium-noise-canceling-earbud-case"
                    value={formState.slug}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <TextArea
                    name="description"
                    placeholder="Comprehensive description of the product..."
                    value={formState.description}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Product Media */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-sky-500" />
                  Product Media
                </h2>

                {/* Main Image URL */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Main Display Image URL <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    name="mainImage"
                    placeholder="https://example.com/product-main.webp"
                    value={mainImageUrl}
                    onChange={(e) => setMainImageUrl(e.target.value)}
                    required
                  />
                  {mainImageUrl && (
                    <div className="flex items-center gap-3 mt-1">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 shrink-0">
                        <img
                          src={mainImageUrl}
                          alt="Main Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          Main image preview
                        </p>
                        <button
                          type="button"
                          onClick={() => setMainImageUrl("")}
                          className="flex items-center gap-1 text-[10px] font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Image URLs */}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-gray-800">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Additional Gallery Image URLs
                  </label>
                  <div className="space-y-2">
                    {additionalImageUrls.map((url, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder={`https://example.com/product-gallery-${
                            index + 1
                          }.webp`}
                          value={url}
                          onChange={(e) =>
                            updateAdditionalImage(index, e.target.value)
                          }
                          className="flex-1"
                        />
                        {url && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-gray-800 shrink-0">
                            <img
                              src={url}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onPress={addAdditionalImage}
                    className="mt-1 w-fit text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-950/50 rounded-xl px-4 py-2 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Image URL
                  </Button>
                </div>
              </Card.Content>
            </Card>

            {/* Specifications */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-500" />
                  Specifications
                </h2>
                <div className="space-y-2">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Key (e.g. Brand)"
                        value={spec.key}
                        onChange={(e) =>
                          updateSpecification(index, "key", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value (e.g. Sony)"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(index, "value", e.target.value)
                        }
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onPress={addSpecification}
                  className="w-fit text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-950/50 rounded-xl px-4 py-2 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Specification
                </Button>
              </Card.Content>
            </Card>
          </div>

          {/* ── Sidebar Column ── */}
          <div className="space-y-6">
            {/* Pricing & Stock */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-500" />
                  Pricing & Stock
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Selling Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    name="price"
                    placeholder="24.99"
                    type="number"
                    step="0.01"
                    value={formState.price}
                    onChange={(e) =>
                      handlePriceChange(
                        e.target.value,
                        formState.originalPrice
                      )
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Original Price ($)
                  </label>
                  <Input
                    name="originalPrice"
                    placeholder="124.99"
                    type="number"
                    step="0.01"
                    value={formState.originalPrice}
                    onChange={(e) =>
                      handlePriceChange(formState.price, e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Discount (%)
                  </label>
                  <Input
                    name="discountPercentage"
                    placeholder="Auto-calculated"
                    type="number"
                    value={formState.discountPercentage}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        discountPercentage: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <Input
                    name="stockQuantity"
                    placeholder="100"
                    type="number"
                    value={formState.stockQuantity}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        stockQuantity: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    SKU
                  </label>
                  <Input
                    name="sku"
                    placeholder="ACC-CASE-001"
                    value={formState.sku}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        sku: e.target.value,
                      }))
                    }
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Categories & Dynamic Subcategories */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Categories & Subcategories
                </h2>

                {/* Primary Category Select */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Primary Category <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    selectedKey={selectedCategoryId || null}
                    onSelectionChange={(key) =>
                      handleCategoryChange(key ? String(key) : "")
                    }
                    placeholder="Select product category"
                    isRequired
                  >
                    <Select.Trigger className="w-full cursor-pointer">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {AVAILABLE_CATEGORIES.map((cat) => (
                          <ListBox.Item
                            key={cat.id}
                            id={cat.id}
                            textValue={cat.label}
                            className="cursor-pointer"
                          >
                            {cat.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Dynamic Subcategories based on Category Selected */}
                <div className="flex flex-col gap-1 pt-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Subcategories
                  </label>
                  {selectedCategoryId ? (
                    availableSubCategories.length > 0 ? (
                      <>
                        <Select
                          selectionMode="multiple"
                          selectedKeys={selectedSubCategoryIds}
                          onSelectionChange={(keys) =>
                            setSelectedSubCategoryIds(
                              new Set(Array.from(keys).map(String))
                            )
                          }
                          placeholder="Select one or more subcategories"
                        >
                          <Select.Trigger className="w-full cursor-pointer">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              {availableSubCategories.map((sub) => (
                                <ListBox.Item
                                  key={sub.id}
                                  id={sub.id}
                                  textValue={sub.label}
                                  className="cursor-pointer"
                                >
                                  {sub.label}
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        {/* Selected Subcategory Badges */}
                        {selectedSubCategoryIds.size > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {Array.from(selectedSubCategoryIds).map((id) => {
                              const label =
                                availableSubCategories.find((s) => s.id === id)
                                  ?.label ?? id;
                              return (
                                <span
                                  key={id}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300"
                                >
                                  {label}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedSubCategoryIds((prev) => {
                                        const next = new Set(prev);
                                        next.delete(id);
                                        return next;
                                      })
                                    }
                                    className="cursor-pointer hover:opacity-75"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No subcategories available for this category.
                      </p>
                    )
                  ) : (
                    <div className="p-3 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-slate-200 dark:border-gray-800 text-center">
                      <p className="text-xs text-gray-400">
                        Please select a category above to load subcategories.
                      </p>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>

            {/* Badges & Visibility */}
            <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl">
              <Card.Content className="p-6 space-y-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Badges & Visibility
                </h2>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Product Badges
                  </label>
                  <Select
                    selectionMode="multiple"
                    selectedKeys={selectedBadges}
                    onSelectionChange={(keys) =>
                      setSelectedBadges(new Set(Array.from(keys).map(String)))
                    }
                    placeholder="Select promotional badges"
                  >
                    <Select.Trigger className="w-full cursor-pointer">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {AVAILABLE_BADGES.map((badge) => (
                          <ListBox.Item
                            key={badge.id}
                            id={badge.id}
                            textValue={badge.label}
                            className="cursor-pointer"
                          >
                            {badge.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* In Stock Switch */}
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      In Stock
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Mark if product is ready for purchase
                    </p>
                  </div>
                  <Switch
                    isSelected={formState.inStock}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, inStock: val }))
                    }
                    className="cursor-pointer"
                  >
                    <Switch.Content className="cursor-pointer">
                      <Switch.Control className="cursor-pointer">
                        <Switch.Thumb className="cursor-pointer" />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>

                {/* Featured Switch */}
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Featured
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Promote in featured grids
                    </p>
                  </div>
                  <Switch
                    isSelected={formState.isFeatured}
                    onChange={(val) =>
                      setFormState((prev) => ({ ...prev, isFeatured: val }))
                    }
                    className="cursor-pointer"
                  >
                    <Switch.Content className="cursor-pointer">
                      <Switch.Control className="cursor-pointer">
                        <Switch.Thumb className="cursor-pointer" />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>
              </Card.Content>
            </Card>

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs py-6 rounded-2xl shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
            >
              <Check className="w-4 h-4" />
              Save Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}