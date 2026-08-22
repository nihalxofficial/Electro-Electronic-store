"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Card,
  Input,
  TextArea,
  Button,
  Select,
  ListBox,
  Switch,
} from "@heroui/react";
import { FolderPlus, Layers, ImageIcon, X, Check } from "lucide-react";
import { Category, SubCategory } from "@/types";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_CATEGORIES = [
  { id: "cat-1", label: "Laptops & Computers" },
  { id: "cat-2", label: "Audio & Wearables" },
  { id: "cat-3", label: "Gaming Consoles" },
  { id: "cat-4", label: "Smartphones & Tablets" },
];

// ─── Slug Generator ─────────────────────────────────────────────────────────────
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ─── Page Component ─────────────────────────────────────────────────────────────
export default function AddCategoryPage() {
  // ── Category Form State ──
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    slug: "",
    image: "",
    description: "",
    isActive: true,
  });

  // ── SubCategory Form State ──
  const [subCategoryData, setSubCategoryData] = useState<SubCategory>({
    categoryId: "",
    name: "",
    slug: "",
    image: "",
    description: "",
    isActive: true,
  });

  // ── Category Handlers ──
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCategoryData((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());
    const result: Category = {
      name: String(raw.catName ?? ""),
      slug: String(raw.catSlug ?? ""),
      image: String(raw.catImage ?? ""),
      description: String(raw.catDescription ?? ""),
      isActive: categoryData.isActive,
    };
    console.log("Category Form Data:", result);
  };

  // ── SubCategory Handlers ──
  const handleSubCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSubCategoryData((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  const handleSubCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());
    const result: SubCategory = {
      categoryId: subCategoryData.categoryId,
      name: String(raw.subName ?? ""),
      slug: String(raw.subSlug ?? ""),
      image: String(raw.subImage ?? ""),
      description: String(raw.subDescription ?? ""),
      isActive: subCategoryData.isActive,
    };
    console.log("SubCategory Form Data:", result);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Manage{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Categories
          </span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add new product categories or assign subcategories to existing ones.
        </p>
      </div>

      {/* ── HeroUI v3 Tabs — compound component pattern ── */}
      <Tabs>
        <TabList className="flex gap-1 p-1 rounded-2xl border border-slate-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 w-fit">
          <Tab
            id="category"
            className="flex items-center gap-2 h-10 px-4 text-xs font-bold rounded-xl cursor-pointer transition-all outline-none
              text-gray-700 dark:text-gray-200
              data-[selected]:bg-gradient-to-r data-[selected]:from-sky-500 data-[selected]:to-blue-600 data-[selected]:text-white data-[selected]:shadow-sm"
          >
            <FolderPlus className="w-4 h-4" />
            Add Category
          </Tab>
          <Tab
            id="subcategory"
            className="flex items-center gap-2 h-10 px-4 text-xs font-bold rounded-xl cursor-pointer transition-all outline-none
              text-gray-700 dark:text-gray-200
              data-[selected]:bg-gradient-to-r data-[selected]:from-sky-500 data-[selected]:to-blue-600 data-[selected]:text-white data-[selected]:shadow-sm"
          >
            <Layers className="w-4 h-4" />
            Add Subcategory
          </Tab>
        </TabList>

        {/* ── TAB PANEL 1: ADD CATEGORY ── */}
        <TabPanel id="category">
          <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl mt-4">
            <Card.Content className="p-6">
              <form onSubmit={handleCategorySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Category Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="catName"
                      placeholder="e.g. Laptops & Computers"
                      value={categoryData.name}
                      onChange={handleCategoryNameChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Slug <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="catSlug"
                      placeholder="laptops-computers"
                      value={categoryData.slug}
                      onChange={(e) =>
                        setCategoryData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <TextArea
                    name="catDescription"
                    placeholder="Provide a brief description for this category..."
                    value={categoryData.description ?? ""}
                    onChange={(e) =>
                      setCategoryData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Category Thumbnail URL
                  </label>
                  <Input
                    name="catImage"
                    placeholder="https://example.com/image.webp"
                    value={typeof categoryData.image === "string" ? categoryData.image : ""}
                    onChange={(e) =>
                      setCategoryData((prev) => ({ ...prev, image: e.target.value }))
                    }
                  />
                  {typeof categoryData.image === "string" && categoryData.image && (
                    <div className="flex items-center gap-3 mt-1">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 shrink-0">
                        <img
                          src={categoryData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Image preview</p>
                        <button
                          type="button"
                          onClick={() => setCategoryData((prev) => ({ ...prev, image: "" }))}
                          className="flex items-center gap-1 text-[10px] font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Category Visibility
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Enable to make this category active across the store front.
                    </p>
                  </div>
                  <Switch
                    isSelected={categoryData.isActive}
                    onChange={(isSelected) =>
                      setCategoryData((prev) => ({ ...prev, isActive: isSelected }))
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

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <Check className="w-4 h-4" />
                    Save Category
                  </Button>
                </div>
              </form>
            </Card.Content>
          </Card>
        </TabPanel>

        {/* ── TAB PANEL 2: ADD SUBCATEGORY ── */}
        <TabPanel id="subcategory">
          <Card className="border border-slate-200/80 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 rounded-2xl mt-4">
            <Card.Content className="p-6">
              <form onSubmit={handleSubCategorySubmit} className="space-y-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Parent Category <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    selectedKey={subCategoryData.categoryId || null}
                    onSelectionChange={(key) =>
                      setSubCategoryData((prev) => ({
                        ...prev,
                        categoryId: key ? String(key) : "",
                      }))
                    }
                    placeholder="Select existing parent category"
                    isRequired
                  >
                    <Select.Trigger className="w-full cursor-pointer">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {MOCK_CATEGORIES.map((cat) => (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Subcategory Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="subName"
                      placeholder="e.g. Gaming Laptops"
                      value={subCategoryData.name}
                      onChange={handleSubCategoryNameChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Slug <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="subSlug"
                      placeholder="gaming-laptops"
                      value={subCategoryData.slug}
                      onChange={(e) =>
                        setSubCategoryData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <TextArea
                    name="subDescription"
                    placeholder="Provide a brief description for this subcategory..."
                    value={subCategoryData.description ?? ""}
                    onChange={(e) =>
                      setSubCategoryData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Subcategory Thumbnail URL
                  </label>
                  <Input
                    name="subImage"
                    placeholder="https://example.com/image.webp"
                    value={typeof subCategoryData.image === "string" ? subCategoryData.image : ""}
                    onChange={(e) =>
                      setSubCategoryData((prev) => ({ ...prev, image: e.target.value }))
                    }
                  />
                  {typeof subCategoryData.image === "string" && subCategoryData.image && (
                    <div className="flex items-center gap-3 mt-1">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 shrink-0">
                        <img
                          src={subCategoryData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Image preview</p>
                        <button
                          type="button"
                          onClick={() => setSubCategoryData((prev) => ({ ...prev, image: "" }))}
                          className="flex items-center gap-1 text-[10px] font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Subcategory Visibility
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Enable to make this subcategory active under its parent.
                    </p>
                  </div>
                  <Switch
                    isSelected={subCategoryData.isActive}
                    onChange={(isSelected) =>
                      setSubCategoryData((prev) => ({ ...prev, isActive: isSelected }))
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

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <Check className="w-4 h-4" />
                    Save Subcategory
                  </Button>
                </div>
              </form>
            </Card.Content>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  );
}