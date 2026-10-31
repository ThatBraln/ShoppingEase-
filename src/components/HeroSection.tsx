import React from 'react';
import { Search, ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const quickCategories: { label: string; cat: ProductCategory }[] = [
    { label: 'Electronics', cat: 'Electronics' },
    { label: 'Kitchen Items', cat: 'Kitchen' },
    { label: 'Home & Living', cat: 'Home & Living' },
    { label: 'Toys', cat: 'Toys' },
    { label: 'Accessories', cat: 'Accessories' },
    { label: 'Shoes', cat: 'Shoes' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Powerful Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-3 tracking-wide">
              <span>EST. 2026</span>
              <span aria-hidden="true">·</span>
              <span>CURATED ONLINE STORE</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Over 10,000+ Verified Orders</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance mb-4">
              Quality goods for <span className="text-blue-600">modern living</span>, delivered fast.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Browse authentic kitchen appliances, studio electronics, cozy home decor, toys, and lifestyle accessories. Enjoy free shipping, clear pricing, and reliable guarantees.
            </p>

            {/* Powerful Interactive Search Bar in Hero */}
            <div className="bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 mb-6 max-w-xl">
              <div className="flex items-center gap-3 px-3 py-1">
                <Search className="w-5 h-5 text-blue-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onScrollToCatalog();
                    }
                  }}
                  placeholder="Search product name, category, or brand (e.g. Fellow, Sony)..."
                  className="w-full text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 py-1.5"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onScrollToCatalog}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Category Discovery */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Popular:</span>
              {quickCategories.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectCategory(item.cat);
                    onScrollToCatalog();
                  }}
                  className="px-3 py-1 bg-white hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200 hover:border-blue-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-200 max-w-xl">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Free Delivery</h4>
                  <p className="text-[11px] text-slate-500">Orders over $75</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Authentic Only</h4>
                  <p className="text-[11px] text-slate-500">2-Year warranty</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Fast Shipping</h4>
                  <p className="text-[11px] text-slate-500">Dispatched in 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Generated Visual Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-square">
              <img
                src="/src/assets/images/hero_modern_lifestyle_1793448941490.jpg"
                alt="Curated modern lifestyle products showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <p className="text-xs font-medium text-blue-300">Featured Curation</p>
                <p className="text-sm font-semibold text-white">Fellowship Kettle & Fidelis Sound</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
