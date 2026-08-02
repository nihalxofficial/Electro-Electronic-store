import React from 'react';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { CategoryGroup, MegaMenuConfig } from '@/types';

interface MegaMenuPanelProps extends MegaMenuConfig {
  minWidth?: string;
}

function CategoryGroupColumn({ group }: { group: CategoryGroup }) {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="font-bold text-[13px] text-[#333e48] dark:text-gray-100 pb-2 border-b border-gray-200 dark:border-gray-800">
        {group.title}
      </h4>
      <ul className="space-y-2.5">
        {group.items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-[13px] leading-snug text-gray-600 dark:text-gray-400 hover:text-[#333e48] dark:hover:text-gray-100 transition-colors ${
                item.isBold ? 'font-bold text-[#333e48] dark:text-gray-100' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PromoBlock({ promo }: { promo: NonNullable<MegaMenuConfig['promo']> }) {
  if (promo.customContent) {
    return <div className="flex flex-col items-start mt-6">{promo.customContent}</div>;
  }

  return (
    <div className="flex flex-col items-start mt-6">
      {promo.badge && (
        <span className="text-[11px] font-bold text-[#333e48] dark:text-gray-100">
          <span className="text-[#fed700]">Electro</span> Exclusive
        </span>
      )}
      {promo.subtitle && (
        <span className="text-[12px] text-sky-500 font-normal mt-1">{promo.subtitle}</span>
      )}
      {promo.title && (
        <h5
          className={`font-light text-[28px] text-sky-400 dark:text-sky-300 leading-tight mt-0.5 ${
            promo.titleClassName ?? ''
          }`}
        >
          {promo.title}
        </h5>
      )}
      {promo.linkText && promo.linkHref && (
        <Link
          href={promo.linkHref}
          className="text-[12px] font-bold text-[#333e48] dark:text-gray-200 mt-1 hover:text-[#fed700] transition-colors"
        >
          &gt; {promo.linkText}
        </Link>
      )}
    </div>
  );
}

export function MegaMenuPanel({
  groups,
  promo,
  showBranding = true,
  imageSrc,
  imageAlt = 'Promotional banner',
  minWidth = '660px',
}: MegaMenuPanelProps) {
  const leftGroups = groups.slice(0, 1);
  const rightGroups = groups.slice(1);

  return (
    <div
      className="flex bg-white dark:bg-gray-950 box-border relative overflow-hidden"
      style={{ minWidth }}
    >
      {/* COLUMN 1 — primary category links + footer */}
      <div className="flex flex-col justify-between p-6 min-w-[240px] max-w-[280px] shrink-0">
        <div className="space-y-6">
          {leftGroups.map((group) => (
            <CategoryGroupColumn key={group.title} group={group} />
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/category/all-electronics"
            className="text-[13px] font-bold text-[#333e48] dark:text-gray-200 hover:text-[#fed700] transition-colors"
          >
            All Electronics
          </Link>
          <span className="block text-[11px] text-gray-400 mt-0.5">Discover more products</span>
          {/* {showBranding && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="font-extrabold text-base text-[#333e48] dark:text-white">
                electro<span className="text-[#fed700]">.</span>
              </span>
              <span className="text-[10px] text-gray-400">WordPress Theme</span>
            </div>
          )} */}
        </div>
      </div>

      {/* COLUMN 2 — secondary links + promo over background image */}
      <div className="relative flex flex-col min-w-[320px] flex-1 border-l border-gray-200 dark:border-gray-800">
        <div className="relative z-10 p-6 pl-8 pb-0">
          {rightGroups.map((group) => (
            <CategoryGroupColumn key={group.title} group={group} />
          ))}
          {promo && <PromoBlock promo={promo} />}
        </div>

        <PromoBackgroundImage src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}

interface PromoBackgroundImageProps {
  src?: string;
  alt: string;
}

function PromoBackgroundImage({ src, alt }: PromoBackgroundImageProps) {
  return (
    <div
      role={src ? 'img' : undefined}
      aria-label={src ? alt : undefined}
      className={`relative mt-auto min-h-[180px] w-full shrink-0 ${
        src
          ? 'bg-no-repeat bg-contain bg-bottom bg-right'
          : 'bg-gray-50 dark:bg-gray-900 border-t border-dashed border-gray-300 dark:border-gray-700'
      }`}
      style={
        src
          ? {
              backgroundImage: `url(${src})`,
            }
          : undefined
      }
      title={src ? alt : 'Add your promotional background image here'}
    >
      {!src && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group cursor-default">
          <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors" />
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
            Add background image
          </span>
        </div>
      )}
    </div>
  );
}
