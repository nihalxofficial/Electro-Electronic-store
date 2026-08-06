import HeroSlider from "@/components/homepage/HeroSlider";
import PromoBanners from "@/components/homepage/PromoBanners";
import WarehouseDeals from "@/components/homepage/WarehouseDeals";
import TrendingProducts from "@/components/homepage/TrendingProducts";
import PopularProducts from "@/components/homepage/PopularProducts";
import { Product, PromoBanner, TabletPromoProps } from "@/types";
import TabletPromoBanner from "@/components/homepage/TabletPromoBanner";
import Newsletter from "@/components/homepage/Newsletter";

const warehouseDealsData: Product[] = [
  // -80% Off Items (6 items)
  {
    id: "wh-1",
    title: "Universal Headphones Case in Black",
    slug: "universal-headphones-case-black",
    categories: ["Accessories", "Headphone Cases"],
    price: 19.99,
    originalPrice: 99.99,
    discountPercent: 80,
    image: "https://veho-world.com/wp-content/uploads/2019/09/case-3.png",
    inStock: true,
  },
  {
    id: "wh-2",
    title: "High-Speed Braided USB Wires",
    slug: "headphones-usb-wires",
    categories: ["Accessories", "Cables"],
    price: 9.99,
    originalPrice: 49.99,
    discountPercent: 80,
    image: "https://vaibnation.com/wp-content/uploads/2025/03/Powerline-PD-60W-removebg-preview.png",
    inStock: true,
  },
  {
    id: "wh-3",
    title: "Protective Screen Guard 3-Pack",
    slug: "screen-guard-3-pack",
    categories: ["Accessories", "Screen Protectors"],
    price: 4.99,
    originalPrice: 24.99,
    discountPercent: 80,
    image: "https://cdn.shopify.com/s/files/1/0682/6606/6175/files/2_cfd6af27-454e-470d-9f2b-ca39df043a34.png?v=1773840460",
    inStock: true,
  },
  {
    id: "wh-80-4",
    title: "Ultra Slim Phone Armor Case",
    slug: "ultra-slim-phone-armor-case",
    categories: ["Accessories", "Cases & Covers"],
    price: 5.99,
    originalPrice: 29.99,
    discountPercent: 80,
    image: "https://ipitaka.com.bd/wp-content/uploads/2025/09/iPhone17pro-over-slim_63d5f24a-84c6-44c1-86a6-bf5d33617c53_500x500.webp.png",
    inStock: true,
  },
  {
    id: "wh-80-5",
    title: "Magnetic Car Mount Holder",
    slug: "magnetic-car-mount-holder",
    categories: ["Car Electronics", "Accessories"],
    price: 7.99,
    originalPrice: 39.99,
    discountPercent: 80,
    image: "https://i.ibb.co.com/HTXfKLHw/Magnetic-Car-Mount-Holder.png",
    inStock: true,
  },
  {
    id: "wh-80-6",
    title: "Anti-Dust Earbud Cleaning Pen",
    slug: "anti-dust-earbud-cleaning-pen",
    categories: ["Accessories", "Headphones"],
    price: 3.99,
    originalPrice: 19.99,
    discountPercent: 80,
    image: "https://ik.imagekit.io/o6njg1asz/cdn/shop/files/PR11095BI18148_EQX23_AIRPOD_CLEANER_SZ4.webp?v=1772182649120&tr=fo-auto,q-auto,f-auto",
    inStock: true,
  },

  // -65% Off Items
  {
    id: "wh-4",
    title: "Ultra Wireless S50 Headphones with Mic",
    slug: "ultra-wireless-s50-headphones",
    categories: ["Accessories", "Headphones"],
    price: 122.5,
    originalPrice: 350.0,
    discountPercent: 65,
    image: "https://i.ibb.co.com/BVpxvpWr/Zeb-Blast-Z-pic2-removebg-preview.png",
    inStock: true,
  },
  {
    id: "wh-5",
    title: "Smart Workout Fitness Tracker Band",
    slug: "smart-fitness-tracker-band",
    categories: ["Wearables", "Watches"],
    price: 35.0,
    originalPrice: 100.0,
    discountPercent: 65,
    image: "https://static.vecteezy.com/system/resources/previews/053/238/231/non_2x/a-fitness-tracker-device-isolated-on-a-transparent-background-free-png.png",
    inStock: true,
  },
  {
    id: "wh-6",
    title: "Ergonomic Vertical Wireless Mouse",
    slug: "ergonomic-vertical-wireless-mouse",
    categories: ["Computers", "Accessories"],
    price: 28.0,
    originalPrice: 80.0,
    discountPercent: 65,
    image: "https://dezlwerqy1h00.cloudfront.net/Media/Images/Product/Visual/22879_pictures_product_visual_1.png?auto=webp&format=pjpg&quality=100",
    inStock: true,
  },

  // -45% Off Items
  {
    id: "wh-7",
    title: "Game Console Controller + USB Cable",
    slug: "game-console-controller-usb",
    categories: ["Game Consoles", "Video Games"],
    price: 54.45,
    originalPrice: 99.0,
    discountPercent: 45,
    image: "https://static.vecteezy.com/system/resources/previews/065/719/721/non_2x/black-wired-game-controller-free-png.png",
    inStock: true,
  },
  {
    id: "wh-8",
    title: "Wireless Audio System Multiroom 360",
    slug: "wireless-audio-system-360",
    categories: ["Audio Speakers", "TV & Audio"],
    price: 1264.45,
    originalPrice: 2299.0,
    discountPercent: 45,
    image: "https://images.samsung.com/is/image/samsung/nz-multiroom-360-speaker-wam650x-wam6500-xy-001-front-black?$624_624_PNG$",
    inStock: true,
  },
  {
    id: "wh-9",
    title: "RGB Mechanical Gaming Keyboard",
    slug: "rgb-mechanical-gaming-keyboard",
    categories: ["Computers", "Gaming Accessories"],
    price: 66.0,
    originalPrice: 120.0,
    discountPercent: 45,
    image: "https://www.pngkey.com/png/full/429-4290320_redragon-k579-mechanical-gaming-keyboard-wired-rgb-iball.png",
    inStock: true,
  },

  // -25% Off Items
  {
    id: "wh-10",
    title: "EliteBook Revolve 810 G2 Touch Laptop",
    slug: "tablet-white-elitebook-revolve",
    categories: ["Laptops", "Laptops & Computers"],
    price: 975.0,
    originalPrice: 1300.0,
    discountPercent: 25,
    image: "https://i.ibb.co.com/3y6RSryq/Elite-Book-Revolve-810-G2-Touch-Laptop.png",
    inStock: true,
  },
  {
    id: "wh-11",
    title: "Compact 4K Action Camera Waterproof",
    slug: "compact-4k-action-camera-waterproof",
    categories: ["Cameras", "Action Cameras"],
    price: 187.5,
    originalPrice: 250.0,
    discountPercent: 25,
    image: "https://i.ibb.co.com/b5k9C9Sb/Compact-4-K-Action-Camera-Waterproof.png",
    inStock: true,
  },
  {
    id: "wh-12",
    title: "Fast Charging Dual Port Car Charger",
    slug: "fast-charging-dual-port-car-charger",
    categories: ["Car Electronics", "Accessories"],
    price: 22.5,
    originalPrice: 30.0,
    discountPercent: 25,
    image: "https://i.ibb.co.com/HTVYP84w/LT2z-PLA8-Pmr7-S36-Byi-DF9-KPar-I89-ICi-Dvlwj8-RJg-removebg-preview.png",
    inStock: true,
  },
];

const promoBannersData: PromoBanner[] = [
  {
    id: "banner-cameras",
    subtitle: "CATCH HOTTEST",
    title: "IN CAMERAS CATEGORY",
    highlightText: "DEALS",
    href: "/products?category=cameras",
    image: "https://i.ibb.co.com/WN4yG2x2/images-3-removebg-preview.png",
    imageAlt: "Cameras Category Deals",
    buttonText: "Shop now",
    priority: true,
  },
  {
    id: "banner-tablets",
    subtitle: "TABLETS, SMARTPHONES",
    title: "AND MORE",
    href: "/products?category=tablets-smartphones",
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

export default function Home() {
  const trendingProductsData = warehouseDealsData.slice(0, 8);
  const popularProductsData = warehouseDealsData.slice(7);

  return (
    <>
      <HeroSlider />
      <WarehouseDeals products={warehouseDealsData} />
      <PromoBanners banners={promoBannersData} />
      <TrendingProducts products={trendingProductsData} />
      <PopularProducts products={popularProductsData} />
      <TabletPromoBanner {...tabletPromoData} />
      {/* <Newsletter/> */}
    </>
  );
}

