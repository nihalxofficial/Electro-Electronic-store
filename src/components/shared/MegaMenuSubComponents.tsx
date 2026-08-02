import Link from 'next/link';
import { MegaMenuPanel } from './MegaMenuPanel';

export function ComputersAccessoriesMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="700px"
      groups={[
        {
          title: 'Computers & Accessories',
          items: [
            { name: 'All Computers & Accessories', href: '/category/all-computers' },
            { name: 'Laptops, Desktops & Monitors', href: '/category/laptops-monitors' },
            { name: 'Printers & Ink', href: '/category/printers-ink' },
            { name: 'Networking & Internet Devices', href: '/category/networking' },
            { name: 'Computer Accessories', href: '/category/computer-accessories' },
            { name: 'Software', href: '/category/software' },
          ],
        },
        {
          title: 'Office & Stationery',
          items: [{ name: 'All Office & Stationery', href: '/category/office-stationery' }],
        },
      ]}
      promo={{
        badge: 'Electro Exclusive',
        subtitle: 'Limited Period Offer',
        title: 'Surface Pro 3',
        linkText: 'Shop now',
        linkHref: '/category/surface-pro',
      }}
      showBranding
    />
  );
}

export function MobilesTabletsMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="680px"
      groups={[
        {
          title: 'Mobiles & Tablets',
          items: [
            { name: 'All Mobile Phones', href: '/category/all-mobiles' },
            { name: 'Smartphones', href: '/category/smartphones' },
            { name: 'Refurbished Mobiles', href: '/category/refurbished' },
            { name: 'All Mobile Accessories', href: '/category/mobile-accessories' },
            { name: 'Cases & Covers', href: '/category/cases' },
          ],
        },
        {
          title: 'Tablets',
          items: [
            { name: 'All Tablets', href: '/category/tablets' },
            { name: 'Tablet Accessories', href: '/category/tablet-accessories' },
          ],
        },
      ]}
      promo={{
        customContent: (
          <>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-extrabold text-base text-[#333e48] dark:text-white">
                electro<span className="text-[#fed700]">.</span>
              </span>
              <span className="text-[13px] text-gray-500 font-semibold">Smartphones</span>
            </div>
            <Link
              href="/category/smartphones"
              className="text-[12px] text-gray-500 underline hover:text-[#fed700] transition-colors"
            >
              &gt; Shop now
            </Link>
          </>
        ),
      }}
      showBranding={false}
    />
  );
}

export function WatchesEyewearMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="660px"
      groups={[
        {
          title: 'Watches',
          items: [
            { name: 'All Watches', href: '/category/all-watches' },
            { name: "Men's Watches", href: '/category/mens-watches' },
            { name: "Women's Watches", href: '/category/womens-watches' },
            { name: 'Premium Watches', href: '/category/premium-watches' },
            { name: 'Deals on Watches', href: '/category/deals-watches' },
          ],
        },
        {
          title: 'Eyewear',
          items: [{ name: "Men's Sunglasses", href: '/category/mens-sunglasses' }],
        },
      ]}
      promo={{
        customContent: (
          <>
            <span className="text-[11px] font-bold text-[#333e48] dark:text-gray-100">
              <span className="text-[#fed700]">Electro</span> Exclusive
            </span>
            <h5 className="font-extrabold text-[11px] tracking-widest text-[#333e48] dark:text-white uppercase mt-2">
              Smart Fitness Watch
            </h5>
            <div className="text-[15px] font-extrabold text-[#333e48] dark:text-gray-100 mt-1">
              Electro <span className="text-cyan-500">blaze</span>
            </div>
            <p className="text-[12px] text-gray-500 mt-0.5">Get fit in style.</p>
          </>
        ),
      }}
      showBranding={false}
    />
  );
}

export function CamerasMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="580px"
      groups={[
        {
          title: 'Cameras, Audio & Video',
          items: [
            { name: 'DSLR Cameras', href: '/category/dslr', isBold: true },
            { name: 'Mirrorless Cameras', href: '/category/mirrorless' },
            { name: 'Camera Lenses', href: '/category/lenses', isBold: true },
            { name: 'Tripods', href: '/category/tripods' },
          ],
        },
      ]}
      showBranding={false}
    />
  );
}

export function MoviesGamesMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="620px"
      groups={[
        {
          title: 'Movies & TV Shows',
          items: [
            { name: 'All Movies & TV Shows', href: '/category/movies-tv' },
            { name: 'All English', href: '/category/english-movies' },
            { name: 'All Hindi', href: '/category/hindi-movies' },
          ],
        },
        {
          title: 'Video Games',
          items: [
            { name: 'PC Games', href: '/category/pc-games' },
            { name: 'Consoles', href: '/category/consoles' },
            { name: 'Accessories', href: '/category/gaming-accessories' },
          ],
        },
      ]}
      promo={{
        badge: 'Electro Exclusive',
        subtitle: 'Limited Period Offer',
        title: 'Game On',
        linkText: 'Shop now',
        linkHref: '/category/video-games',
      }}
      showBranding={false}
    />
  );
}

export function TvAudioMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="620px"
      groups={[
        {
          title: 'Televisions',
          items: [
            { name: 'All Televisions', href: '/category/tv' },
            { name: 'Smart TVs', href: '/category/smart-tv' },
            { name: 'Large Appliances', href: '/category/large-appliances' },
          ],
        },
        {
          title: 'Audio',
          items: [
            { name: 'All Audio', href: '/category/audio' },
            { name: 'Headphones', href: '/category/headphones' },
            { name: 'Speakers', href: '/category/speakers' },
          ],
        },
      ]}
      promo={{
        badge: 'Electro Exclusive',
        subtitle: 'Limited Period Offer',
        title: '4K Ultra HD',
        linkText: 'Shop now',
        linkHref: '/category/tv',
      }}
      showBranding={false}
    />
  );
}

export function CarMotorbikeMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="620px"
      groups={[
        {
          title: 'Car & Motorbike',
          items: [
            { name: 'All Car & Motorbike', href: '/category/car-motorbike' },
            { name: 'Car Electronics', href: '/category/car-electronics' },
            { name: 'Motorbike Accessories', href: '/category/motorbike-accessories' },
          ],
        },
        {
          title: 'Industrial',
          items: [
            { name: 'All Industrial', href: '/category/industrial' },
            { name: 'Tools & Equipment', href: '/category/tools' },
          ],
        },
      ]}
      promo={{
        badge: 'Electro Exclusive',
        subtitle: 'Limited Period Offer',
        title: 'Drive Smart',
        linkText: 'Shop now',
        linkHref: '/category/car-electronics',
      }}
      showBranding={false}
    />
  );
}

export function AccessoriesMegaMenu() {
  return (
    <MegaMenuPanel
      minWidth="580px"
      groups={[
        {
          title: 'Accessories',
          items: [
            { name: 'All Accessories', href: '/category/accessories' },
            { name: 'Cases & Covers', href: '/category/cases' },
            { name: 'Chargers & Cables', href: '/category/chargers' },
            { name: 'Power Banks', href: '/category/power-banks' },
          ],
        },
      ]}
      promo={{
        badge: 'Electro Exclusive',
        subtitle: 'Limited Period Offer',
        title: 'Must Haves',
        linkText: 'Shop now',
        linkHref: '/category/accessories',
      }}
      showBranding={false}
    />
  );
}
