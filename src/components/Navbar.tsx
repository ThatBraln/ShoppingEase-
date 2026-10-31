import React from 'react';
import { ShoppingBag, Search, Phone, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenContact: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
  onOpenContact,
  onScrollToCatalog
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Promotional Trust Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-6 justify-center">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>Free Express Shipping on orders over $75</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Guaranteed Authentic & 2-Year Warranty</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>30-Day Hassle-Free Returns</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={onOpenContact}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>24/7 Support: +1 (800) 555-0199</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
            N
          </span>
          <span>Nordic Commerce</span>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              onSelectCategory('All');
              onScrollToCatalog();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
              activeCategory === 'All' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              onSelectCategory('Electronics');
              onScrollToCatalog();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
              activeCategory === 'Electronics' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Electronics
          </button>
          <button
            onClick={() => {
              onSelectCategory('Kitchen');
              onScrollToCatalog();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
              activeCategory === 'Kitchen' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Kitchen Items
          </button>
          <button
            onClick={() => {
              onSelectCategory('Home & Living');
              onScrollToCatalog();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 ${
              activeCategory === 'Home & Living' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Home & Living
          </button>
          <button
            onClick={onOpenContact}
            className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
          >
            Contact Us
          </button>
        </nav>

        {/* Zone 3: Search shortcut & Primary Cart Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block w-48 md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-slate-900 border border-transparent focus:border-blue-600 rounded-lg outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Cart Primary Action Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Shopping Cart</span>
            <span className="bg-white text-blue-700 font-bold px-1.5 py-0.5 rounded-full text-[11px] tabular-nums min-w-[1.25rem] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
