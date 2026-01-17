'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flame, Layers, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/collection', label: 'Collection', icon: Layers },
  { href: '/drops', label: 'Drops', icon: Flame },
  { href: '/cart', label: 'Cart', icon: ShoppingBag },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-none px-4 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="pointer-events-auto bg-white/95 dark:bg-black/90 text-gray-900 dark:text-white rounded-3xl border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-between px-4 py-3 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-1 text-xs font-medium transition-colors ${
                  active ? 'text-brand-green' : 'text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white'
                }`}
              >
                <div
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors ${
                    active
                      ? 'border-brand-green/60 bg-brand-green/10'
                      : 'border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  {item.label === 'Cart' && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-5 px-1 rounded-full bg-brand-green text-white text-[11px] font-heading leading-5 text-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

