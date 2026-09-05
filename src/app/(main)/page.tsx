import HeroSlider from "@/components/homepage/HeroSlider";
import CategoriesDropdown from "@/components/shared/CategoriesDropdown";
import PromoBanners from "@/components/homepage/PromoBanners";
import WarehouseDeals from "@/components/homepage/WarehouseDeals";
import TrendingProducts from "@/components/homepage/TrendingProducts";
import PopularProducts from "@/components/homepage/PopularProducts";
import { Product } from "@/types";
import { PromoBanner, TabletPromoProps } from "@/types/home";
import TabletPromoBanner from "@/components/homepage/TabletPromoBanner";
import Brand from "@/components/homepage/Brand";

import { getProducts } from "@/lib/api/products";

const promoBannersData: PromoBanner[] = [
  {
    id: "banner-cameras",
    subtitle: "CATCH HOTTEST",
    title: "IN CAMERAS CATEGORY",
    highlightText: "DEALS",
    href: "/shop?category=cameras",
    image: "https://dezlwerqy1h00.cloudfront.net/Media/Images/Product/Visual/22879_pictures_product_visual_1.png?auto=webp&format=pjpg&quality=100",
    imageAlt: "Cameras Category Deals",
    buttonText: "Shop now",
    priority: true,
  },
  {
    id: "banner-tablets",
    subtitle: "TABLETS, SMARTPHONES",
    title: "AND MORE",
    href: "/shop?category=tablets-smartphones",
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    imageAlt: "Tablets and Smartphones",
    pricePrefix: "FROM",
    priceDollars: "749",
    priceCents: "99",
  },
];

const tabletPromoData: TabletPromoProps = {
  categorySlug: "tablets",
  titlePrefix: "SHOP AND",
  highlightText: "SAVE BIG",
  titleSuffix: "ON HOTTEST TABLETS",
  startingPrice: "79",
  cents: "99",
  imageSrc: "https://i.ibb.co.com/zh1qTHwh/Tablets.png",
};

export default async function Home() {
  const [trendingRes, popularRes] = await Promise.all([
    getProducts({ badge: "trending", limit: 14 }),
    getProducts({ badge: "popular", limit: 14 }),
  ]);

  const trendingProductsData: Product[] = trendingRes?.data?.products ?? [];
  const popularProductsData: Product[] = popularRes?.data?.products ?? [];

  return (
    <>
      {/* ── Hero Section: Left Docked Categories & Right-Shifted Slider ── */}
      <section className="w-full max-w-7xl mx-auto my-6 relative z-30">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Docked Categories on Desktop */}
          <div className="hidden lg:block w-[270px] shrink-0 relative z-40">
            <CategoriesDropdown variant="docked" label="All Departments" />
          </div>

          {/* Hero Slider shifted right */}
          <div className="flex-1 min-w-0 w-full relative z-10">
            <HeroSlider />
          </div>
        </div>
      </section>

      <WarehouseDeals />
      <PromoBanners banners={promoBannersData} />
      <TrendingProducts products={trendingProductsData} />
      <PopularProducts products={popularProductsData} />
      <TabletPromoBanner tabletPromoData={tabletPromoData} />
      <Brand />
    </>
  );
}

