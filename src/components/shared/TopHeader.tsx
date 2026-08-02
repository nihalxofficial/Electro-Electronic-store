import React from 'react';
import Link from 'next/link';
import { MapPin, Truck, ShoppingBag, User } from 'lucide-react';
import { TopBarItem } from '@/types';


// Top Bar Specific Data Array
export const TOP_BAR_ITEMS: TopBarItem[] = [
  { label: 'Store Locator', href: '/store-locator', icon: MapPin },
  { label: 'Track Your Order', href: '/track-order', icon: Truck },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'My Account', href: '/account', icon: User },
];

export default function TopBar() {
  return (
    <div className="w-full bg-[#f4f4f4] border-b border-gray-200 text-xs text-[#333333]">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        
        {/* Left Side: Welcome Text */}
        <div className="flex items-center">
          <span className=" font-normal">
            Welcome to Worldwide Electronics Store
          </span>
        </div>

        {/* Right Side: Links mapped from TOP_BAR_ITEMS */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {TOP_BAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <React.Fragment key={item.label}>
                <Link 
                  href={item.href} 
                  className="group flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-amber-500 transition-colors" />
                  <span>{item.label}</span>
                </Link>

                {/* Vertical Divider */}
                {index < TOP_BAR_ITEMS.length - 1 && (
                  <span className="text-gray-300 font-light">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}