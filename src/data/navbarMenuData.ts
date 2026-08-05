/**
 * navbarMenuData.ts
 * Single place to edit all navbar content:
 *   - SEARCH_CATEGORY_OPTIONS  → search bar dropdown
 *   - ACTION_ITEMS             → icon links (Compare, Wishlist, etc.)
 *   - CATEGORIES_MENU_ITEMS    → left sidebar of the mega menu
 *   - MEGA_MENU_PANELS         → right panel content (columns, promo, image)
 */

import { Repeat, Heart, User, ShoppingBag } from 'lucide-react';
import { CategoryOption, HeaderActionItem, CategoryMenuItem, MegaMenuConfig } from '@/types';

// Search bar category dropdown
export const SEARCH_CATEGORY_OPTIONS: CategoryOption[] = [
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Laptops',        value: 'Laptops'        },
  { label: 'Smartphones',    value: 'Smartphones'    },
  { label: 'Cameras',        value: 'Cameras'        },
  { label: 'Audio',          value: 'Audio'          },
  { label: 'Video Games',    value: 'Video Games'    },
];

// Navbar right-side icon links
export const ACTION_ITEMS: HeaderActionItem[] = [
  { id: 'compare',  label: 'Compare',  href: '/compare',   icon: Repeat,      badgeCount: 0             },
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist',  icon: Heart                                  },
  { id: 'account',  label: 'Account',  href: '/account',   icon: User                                   },
  { id: 'cart',     label: 'Cart',     href: '/cart',      icon: ShoppingBag, badgeCount: 0, showPrice: true },
];

// Left sidebar items of the Categories mega menu
// isBold: true  → bold text (special deal links)
// hasSubmenu    → shows right-side panel on hover (panel defined in MEGA_MENU_PANELS)
export const CATEGORIES_MENU_ITEMS: Omit<CategoryMenuItem, 'SubMenuComponent'>[] = [
  { id: 'value-of-day',    name: 'Value of the Day',            href: '/deals/value-of-the-day',  isBold: true  },
  { id: 'top-100-offers',  name: 'Top 100 Offers',              href: '/deals/top-100-offers',    isBold: true  },
  { id: 'new-arrivals',    name: 'New Arrivals',                href: '/deals/new-arrivals',      isBold: true  },
  { id: 'computers',       name: 'Computers & Accessories',     href: '/category/computers',      hasSubmenu: true },
  { id: 'cameras-audio',   name: 'Cameras, Audio & Video',      href: '/category/cameras',        hasSubmenu: true },
  { id: 'mobiles-tablets', name: 'Mobiles & Tablets',           href: '/category/smartphones',    hasSubmenu: true },
  { id: 'movies-games',    name: 'Movies, Music & Video Games', href: '/category/video-games',    hasSubmenu: true },
  { id: 'tv-audio',        name: 'TV & Audio',                  href: '/category/tv-audio',       hasSubmenu: true },
  { id: 'watches-eyewear', name: 'Watches & Eyewear',           href: '/category/watches',        hasSubmenu: true },
  { id: 'car-motorbike',   name: 'Car, Motorbike & Industrial', href: '/category/car-electronics', hasSubmenu: true },
  { id: 'accessories',     name: 'Accessories',                 href: '/category/accessories',    hasSubmenu: true },
];

// Right-side mega menu panel content, keyed by the same id as CATEGORIES_MENU_ITEMS
// To change an image: update imageSrc on the matching entry below
export const MEGA_MENU_PANELS: Record<string, MegaMenuConfig> = {
  'laptops-computers': {
    groups: [
      {
        title: 'Computers & Accessories',
        items: [
          { name: 'All Computers & Accessories',  href: '/category/all-computers'        },
          { name: 'Laptops, Desktops & Monitors', href: '/category/laptops-monitors'      },
          { name: 'Printers & Ink',               href: '/category/printers-ink'          },
          { name: 'Networking & Internet Devices', href: '/category/networking'           },
          { name: 'Computer Accessories',         href: '/category/computer-accessories'  },
          { name: 'Software',                     href: '/category/software'              },
        ],
      },
      {
        title: 'Office & Stationery',
        items: [
          { name: 'All Office & Stationery', href: '/category/office-stationery' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Surface Pro 3', linkText: 'Shop now', linkHref: '/category/surface-pro',
    },
    imageSrc: 'https://miro.medium.com/v2/resize:fit:1400/1*GWSSIrJ_EauYcXugvbUqHA.jpeg',
    imageAlt: 'Surface Pro 3',
    showBranding: true,
  },

  computers: {
    groups: [
      {
        title: 'Computers & Accessories',
        items: [
          { name: 'All Computers & Accessories',  href: '/category/all-computers'        },
          { name: 'Laptops, Desktops & Monitors', href: '/category/laptops-monitors'      },
          { name: 'Printers & Ink',               href: '/category/printers-ink'          },
          { name: 'Networking & Internet Devices', href: '/category/networking'           },
          { name: 'Computer Accessories',         href: '/category/computer-accessories'  },
          { name: 'Software',                     href: '/category/software'              },
        ],
      },
      {
        title: 'Office & Stationery',
        items: [
          { name: 'All Office & Stationery', href: '/category/office-stationery' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Surface Pro 3', linkText: 'Shop now', linkHref: '/category/surface-pro',
    },
    imageSrc: 'https://miro.medium.com/v2/resize:fit:1400/1*GWSSIrJ_EauYcXugvbUqHA.jpeg',
    imageAlt: 'Surface Pro 3',
    showBranding: true,
  },

  'cameras-audio': {
    groups: [
      {
        title: 'Cameras',
        items: [
          { name: 'DSLR Cameras',       href: '/category/dslr',          isBold: true },
          { name: 'Mirrorless Cameras', href: '/category/mirrorless'                  },
          { name: 'Action Cameras',     href: '/category/action-cameras'              },
        ],
      },
      {
        title: 'Lenses & Accessories',
        items: [
          { name: 'Camera Lenses', href: '/category/lenses', isBold: true },
          { name: 'Tripods',       href: '/category/tripods'              },
          { name: 'Lighting',      href: '/category/lighting'             },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Canon EOS 700D', linkText: 'Shop now', linkHref: '/category/dslr',
    },
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty_GdWA3hpKkMJ6h3hvj0jhSSZIi9D9_QS_cosKfRAWB_hrD18HKej-W6&s=10',
    imageAlt: 'Canon EOS camera',
    showBranding: false,
  },

  'mobiles-tablets': {
    groups: [
      {
        title: 'Mobiles & Tablets',
        items: [
          { name: 'All Mobile Phones',      href: '/category/all-mobiles'       },
          { name: 'Smartphones',            href: '/category/smartphones'        },
          { name: 'Refurbished Mobiles',    href: '/category/refurbished'        },
          { name: 'All Mobile Accessories', href: '/category/mobile-accessories' },
          { name: 'Cases & Covers',         href: '/category/cases'              },
        ],
      },
      {
        title: 'Tablets',
        items: [
          { name: 'All Tablets',        href: '/category/tablets'           },
          { name: 'Tablet Accessories', href: '/category/tablet-accessories' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Smartphones',
      title: 'electro.', linkText: 'Shop now', linkHref: '/category/smartphones',
    },
    imageSrc: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60',
    imageAlt: 'Electro Smartphones',
    showBranding: false,
  },

  'movies-games': {
    groups: [
      {
        title: 'Movies & TV Shows',
        items: [
          { name: 'All Movies & TV Shows', href: '/category/movies-tv'     },
          { name: 'All English',           href: '/category/english-movies' },
          { name: 'All Hindi',             href: '/category/hindi-movies'   },
        ],
      },
      {
        title: 'Video Games',
        items: [
          { name: 'PC Games',    href: '/category/pc-games'           },
          { name: 'Consoles',    href: '/category/consoles'           },
          { name: 'Accessories', href: '/category/gaming-accessories' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Game On', linkText: 'Shop now', linkHref: '/category/video-games',
    },
    imageSrc: 'https://f.nooncdn.com/p/pzsku/ZE642E1744B6A8449DC21Z/45/1755480708/c6e15361-d9f8-4cfe-858b-ab9a0c7ade35.jpg?width=320',
    imageAlt: 'Gaming',
    showBranding: false,
  },

  'tv-audio': {
    groups: [
      {
        title: 'Televisions',
        items: [
          { name: 'All Televisions',  href: '/category/tv'               },
          { name: 'Smart TVs',        href: '/category/smart-tv'         },
          { name: 'Large Appliances', href: '/category/large-appliances' },
        ],
      },
      {
        title: 'Audio',
        items: [
          { name: 'All Audio',  href: '/category/audio'      },
          { name: 'Headphones', href: '/category/headphones' },
          { name: 'Speakers',   href: '/category/speakers'   },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: '4K Ultra HD', linkText: 'Shop now', linkHref: '/category/tv',
    },
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9Z87HMShhgx43ScePJcOQUTNNhs0l7IzJJXinir0sBo0VXl74T2lv07A&s=10',
    imageAlt: '4K TV',
    showBranding: false,
  },

  'watches-eyewear': {
    groups: [
      {
        title: 'Watches',
        items: [
          { name: 'All Watches',      href: '/category/all-watches'     },
          { name: "Men's Watches",    href: '/category/mens-watches'    },
          { name: "Women's Watches",  href: '/category/womens-watches'  },
          { name: 'Premium Watches',  href: '/category/premium-watches' },
          { name: 'Deals on Watches', href: '/category/deals-watches'   },
        ],
      },
      {
        title: 'Eyewear',
        items: [
          { name: "Men's Sunglasses", href: '/category/mens-sunglasses' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Smart Fitness Watch',
      title: 'Electro blaze', linkText: 'Shop now', linkHref: '/category/all-watches',
    },
    imageSrc: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=60',
    imageAlt: 'Smart Fitness Watch',
    showBranding: false,
  },

  'car-motorbike': {
    groups: [
      {
        title: 'Car & Motorbike',
        items: [
          { name: 'All Car & Motorbike',   href: '/category/car-motorbike'         },
          { name: 'Car Electronics',        href: '/category/car-electronics'       },
          { name: 'Motorbike Accessories',  href: '/category/motorbike-accessories' },
        ],
      },
      {
        title: 'Industrial',
        items: [
          { name: 'All Industrial',    href: '/category/industrial' },
          { name: 'Tools & Equipment', href: '/category/tools'      },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Drive Smart', linkText: 'Shop now', linkHref: '/category/car-electronics',
    },
    imageSrc: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format&fit=crop&q=60',
    imageAlt: 'Car electronics',
    showBranding: false,
  },

  accessories: {
    groups: [
      {
        title: 'Accessories',
        items: [
          { name: 'All Accessories',   href: '/category/accessories' },
          { name: 'Cases & Covers',    href: '/category/cases'       },
          { name: 'Chargers & Cables', href: '/category/chargers'    },
          { name: 'Power Banks',       href: '/category/power-banks' },
        ],
      },
    ],
    promo: {
      badge: 'Electro Exclusive', subtitle: 'Limited Period Offer',
      title: 'Must Haves', linkText: 'Shop now', linkHref: '/category/accessories',
    },
    imageSrc: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600&auto=format&fit=crop&q=60',
    imageAlt: 'Accessories',
    showBranding: false,
  },
};
