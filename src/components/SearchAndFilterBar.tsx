import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES, BRANDS } from '../data/products';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name') => void;
  priceFilter: 'all' | 'under50' | '50to100' | '100to200' | 'over200';
  onPriceFilterChange: (price: 'all' | 'under50' | '50to100' | '100to200' | 'over200') => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  totalResults: number;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  sortBy,
  onSortChange,
  priceFilter,
  onPriceFilterChange,
  inStockOnly,
  onToggleInStock,
  totalResults,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 py-6 sticky top-18 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Row: Functional Search Bar & Sorting */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Functional Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by product name, category, or brand name..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 border border-slate-200 focus:border-blue-600 rounded-xl outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Secondary Controls: Brand, Price range, Sort */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => onSelectBrand(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-blue-600 transition-colors cursor-pointer"
            >
              <option value="all">All Brands</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => onPriceFilterChange(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-blue-600 transition-colors cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 to $100</option>
              <option value="100to200">$100 to $200</option>
              <option value="over200">Over $200</option>
            </select>

            {/* Sort by */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-transparent outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <button
              onClick={onToggleInStock}
              className={`px-3 py-2 text-xs rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                inStockOnly
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                inStockOnly ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
              }`}>
                {inStockOnly && <Check className="w-3 h-3" />}
              </span>
              <span>In Stock Only</span>
            </button>
          </div>

        </div>

        {/* Bottom Row: Category Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? 'All Goods' : cat}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block text-xs text-slate-500 whitespace-nowrap tabular-nums">
            Showing <strong className="text-slate-900">{totalResults}</strong> {totalResults === 1 ? 'item' : 'items'}
          </div>
        </div>

      </div>
    </div>
  );
};
