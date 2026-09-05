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

const products: Product[] = [
  // 0-20% Off Items
  {
    id: "wh-0-1",
    title: "Apple AirPods Pro (2nd Gen) with MagSafe",
    slug: "apple-airpods-pro-2nd-gen",
    categories: ["Audio & Headphones", "Earbuds"],
    price: 249.0,
    originalPrice: 280.0,
    discountPercentage: 11,
    image: "https://i.cdn.newsbytesapp.com/images/l68220220704140051.png",
    inStock: true,
  },
  {
    id: "wh-0-2",
    title: "Google Nest Audio Smart Assistant Speaker",
    slug: "google-nest-audio",
    categories: ["Smart Home", "Speakers"],
    price: 89.99,
    originalPrice: 99.99,
    discountPercentage: 10,
    image: "https://www.ryans.com/storage/products/main/steelseries-arctis-nova-7-wireless-black-over-ear-11735643262.webp",
    inStock: true,
  },
  {
    id: "wh-0-3",
    title: "Anker PowerPort III Pod 65W GaN Fast Charger",
    slug: "anker-powerport-iii-65w",
    categories: ["Accessories", "Chargers"],
    price: 34.99,
    originalPrice: 39.99,
    discountPercentage: 13,
    image: "https://www.ryans.com/storage/products/main/anker-powerport-iii-pod-65w-gan-usb-dual-usb-c-11778759166.webp",
    inStock: true,
  },
  {
    id: "wh-0-4",
    title: "SteelSeries Arctis Nova 7 Wireless Gaming Headset",
    slug: "steelseries-arctis-nova-7",
    categories: ["Gaming", "Headphones"],
    price: 159.0,
    originalPrice: 189.0,
    discountPercentage: 16,
    image: "https://www.ryans.com/storage/products/main/steelseries-arctis-nova-7-wireless-black-over-ear-11735643262.webp",
    inStock: true,
  },
  {
    id: "wh-0-5",
    title: "Bose QuietComfort 45 Bluetooth Headphone",
    slug: "bose-quietcomfort-45",
    categories: ["Audio", "Headphones"],
    price: 279.0,
    originalPrice: 329.0,
    discountPercentage: 15,
    image: "https://www.ryans.com/storage/products/main/bose-quietcomfort-45-limited-edition-midnight-11681645724.webp",
    inStock: true,
  },
  {
    id: "wh-0-6",
    title: "Apple Watch Series 9 GPS 41mm Midnight",
    slug: "apple-watch-series-9-gps",
    categories: ["Wearables", "Smartwatches"],
    price: 329.0,
    originalPrice: 399.0,
    discountPercentage: 18,
    image: "https://www.ryans.com/storage/products/main/apple-watch-series-9-41mm-gps-midnight-aluminum-11701492085.webp",
    inStock: true,
  },

  // 20-40% Off Items
  {
    id: "wh-10",
    title: "EliteBook Revolve 810 G2 Touch Laptop",
    slug: "tablet-white-elitebook-revolve",
    categories: ["Laptops", "Laptops & Computers"],
    price: 975.0,
    originalPrice: 1300.0,
    discountPercentage: 25,
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
    discountPercentage: 25,
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
    discountPercentage: 25,
    image: "https://i.ibb.co.com/HTVYP84w/LT2z-PLA8-Pmr7-S36-Byi-DF9-KPar-I89-ICi-Dvlwj8-RJg-removebg-preview.png",
    inStock: true,
  },
  {
    id: "wh-20-4",
    title: "Dell XPS 13 Plus 13th Gen Intel Core i7",
    slug: "dell-xps-13-plus-intel-i7",
    categories: ["Laptops", "Ultrabooks"],
    price: 1199.0,
    originalPrice: 1699.0,
    discountPercentage: 29,
    image: "https://www.ryans.com/storage/products/main/dell-xps-13-plus-9320-13th-gen-intel-core-i7-11724233634.webp",
    inStock: true,
  },
  {
    id: "wh-20-5",
    title: "Sony PlayStation DualSense Edge Midnight Black",
    slug: "sony-playstation-dualsense-edge",
    categories: ["Gaming", "Controllers"],
    price: 149.0,
    originalPrice: 199.0,
    discountPercentage: 25,
    image: "https://assets.gadgetandgear.com/upload/product/20220113_1642052594_412206.jpeg",
    inStock: true,
  },
  {
    id: "wh-20-6",
    title: "Dell 24-inch Full HD LED Monitor",
    slug: "dell-24-inch-full-hd-monitor",
    categories: ["Computers", "Monitors"],
    price: 119.0,
    originalPrice: 165.0,
    discountPercentage: 28,
    image: "https://www.ryans.com/storage/products/main/dell-se2419hr-24-inch-full-hd-led-monitor-vga-11582521889.webp",
    inStock: true,
  },

  // 40-60% Off Items
  {
    id: "wh-7",
    title: "Game Console Controller + USB Cable",
    slug: "game-console-controller-usb",
    categories: ["Game Consoles", "Video Games"],
    price: 54.45,
    originalPrice: 99.0,
    discountPercentage: 45,
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
    discountPercentage: 45,
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
    discountPercentage: 45,
    image: "https://www.pngkey.com/png/full/429-4290320_redragon-k579-mechanical-gaming-keyboard-wired-rgb-iball.png",
    inStock: true,
  },
  {
    id: "wh-40-4",
    title: "Multi-Port USB 3.0 Hub High Speed 7-Port",
    slug: "multi-port-usb-3-hub-7-port",
    categories: ["Accessories", "Adapters & Hubs"],
    price: 19.99,
    originalPrice: 39.99,
    discountPercentage: 50,
    image: "https://media.startech.com/cms/products/gallery_large/ntbkbag156.main.jpg",
    inStock: true,
  },
  {
    id: "wh-40-5",
    title: "Smart Wi-Fi Outdoor Security Camera 2K",
    slug: "smart-wifi-outdoor-security-camera",
    categories: ["Smart Home", "Security"],
    price: 49.99,
    originalPrice: 99.99,
    discountPercentage: 50,
    image: "https://cdn.bdstall.com/product-image/giant_128149.jpg",
    inStock: true,
  },
  {
    id: "wh-40-6",
    title: "JBL Flip 6 Waterproof Portable Bluetooth Speaker",
    slug: "jbl-flip-6-waterproof-speaker",
    categories: ["Audio", "Speakers"],
    price: 69.99,
    originalPrice: 129.99,
    discountPercentage: 46,
    image: "https://www.ryans.com/storage/products/main/jbl-flip-6-waterproof-green-portable-bluetooth-11663831810.webp",
    inStock: true,
  },

  // 60-80% Off Items
  {
    id: "wh-1",
    title: "Universal Headphones Case in Black",
    slug: "universal-headphones-case-black",
    categories: ["Accessories", "Headphone Cases"],
    price: 19.99,
    originalPrice: 99.99,
    discountPercentage: 80,
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
    discountPercentage: 80,
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
    discountPercentage: 80,
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
    discountPercentage: 80,
    image: "https://ipitaka.com.bd/wp-content/uploads/2025/09/iPhone17pro-over-slim_63d5f24a-84c6-44c1-86a6-bf5d33617c53_500x500.webp.png",
    inStock: true,
  },
  {
    id: "wh-4",
    title: "Ultra Wireless S50 Headphones with Mic",
    slug: "ultra-wireless-s50-headphones",
    categories: ["Accessories", "Headphones"],
    price: 122.5,
    originalPrice: 350.0,
    discountPercentage: 65,
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
    discountPercentage: 65,
    image: "https://static.vecteezy.com/system/resources/previews/053/238/231/non_2x/a-fitness-tracker-device-isolated-on-a-transparent-background-free-png.png",
    inStock: true,
  },
];

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

export default function Home() {
  const trendingProductsData = products.slice(0, 8);
  const popularProductsData = products.slice(7);

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

      <WarehouseDeals warehouseDealsProducts={products} />
      <PromoBanners banners={promoBannersData} />
      <TrendingProducts products={trendingProductsData} />
      <PopularProducts products={popularProductsData} />
      <TabletPromoBanner tabletPromoData={tabletPromoData} />
      <Brand />
    </>
  );
}

