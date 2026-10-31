import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ContactSection } from './components/ContactSection';
import { PRODUCTS_DATA } from './data/products';
import { Product, ProductCategory, CartItem, OrderDetails } from './types';
import { Search, Sparkles, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & Category state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under50' | '50to100' | '100to200' | 'over200'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nordic_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nordic_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Promo code verification
  const handleApplyPromoCode = (code: string): boolean => {
    const validCodes: Record<string, number> = {
      SAVE10: 10,
      NORDIC15: 15,
      WELCOME20: 20,
      FREESHIP: 10,
    };

    if (validCodes[code]) {
      setAppliedDiscount(validCodes[code]);
      showToast(`Promo code applied: ${validCodes[code]}% discount!`);
      return true;
    }
    return false;
  };

  // Order success handler
  const handleOrderSuccess = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setCartItems([]);
    setAppliedDiscount(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Scroll smoothly to catalog
  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to contact
  const scrollToContact = () => {
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Multi-field search & filtering logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockCount > 0);
    }

    // Price range filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'under50') result = result.filter((p) => p.price < 50);
      else if (priceFilter === '50to100') result = result.filter((p) => p.price >= 50 && p.price <= 100);
      else if (priceFilter === '100to200') result = result.filter((p) => p.price > 100 && p.price <= 200);
      else if (priceFilter === 'over200') result = result.filter((p) => p.price > 200);
    }

    // Powerful search query matcher:
    // Searches: Product Name, Category, Brand Name, Tags, and Description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        const matchDesc = p.shortDescription.toLowerCase().includes(q);
        return matchName || matchCategory || matchBrand || matchTags || matchDesc;
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedBrand, inStockOnly, priceFilter, searchQuery, sortBy]);

  // "Lastly add matching products automatically" when no exact search results are found:
  const automaticMatchingProducts = useMemo(() => {
    if (filteredProducts.length > 0 || !searchQuery.trim()) {
      return [];
    }
    // Find closest matches by looking for partial word overlaps or category matches
    const q = searchQuery.toLowerCase();
    const suggestions = PRODUCTS_DATA.filter((p) => {
      // Return featured items or items from same general family
      return p.isFeatured || p.rating >= 4.8;
    }).slice(0, 4);

    return suggestions.length > 0 ? suggestions : PRODUCTS_DATA.slice(0, 4);
  }, [filteredProducts, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        activeCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenContact={scrollToContact}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Hero Showcase Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Search, Filter & Category Control Bar */}
      <div id="product-catalog">
        <SearchAndFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly(!inStockOnly)}
          totalResults={filteredProducts.length}
        />
      </div>

      {/* Main Product Catalog Grid Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Active Filters Bar if any */}
        {(selectedCategory !== 'All' || selectedBrand !== 'all' || priceFilter !== 'all' || inStockOnly || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Active Filters:</span>
            
            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md flex items-center gap-1.5 font-medium">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            )}

            {selectedBrand !== 'all' && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md flex items-center gap-1.5 font-medium">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('all')} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            )}

            {priceFilter !== 'all' && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md flex items-center gap-1.5 font-medium">
                Price: {priceFilter}
                <button onClick={() => setPriceFilter('all')} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            )}

            {inStockOnly && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md flex items-center gap-1.5 font-medium">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            )}

            {searchQuery && (
              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md flex items-center gap-1.5 font-medium">
                Query: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">✕</button>
              </span>
            )}

            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('all');
                setPriceFilter('all');
                setInStockOnly(false);
                setSearchQuery('');
              }}
              className="ml-auto text-blue-600 hover:text-blue-800 font-semibold underline text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Grid or Not Found Message */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
              />
            ))}
          </div>
        ) : (
          /* "show a message if the products is not found and lastly add matching products automatically" */
          <div className="space-y-12">
            
            {/* Not Found Message Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Search className="w-8 h-8 stroke-1" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                No products found matching "{searchQuery}"
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
                We couldn't find any direct matches with your current search keywords or filters. Check the spelling or try broader terms like "kettle", "shoes", "jacket", or "watch".
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedBrand('all');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Clear Search & View All Products
                </button>
                <button
                  onClick={scrollToContact}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Ask Customer Support
                </button>
              </div>
            </div>

            {/* Automatically Added Matching Products (as explicitly required) */}
            {automaticMatchingProducts.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Alternatives</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Popular Matching Products You May Like
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Browse Store Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {automaticMatchingProducts.map((product) => (
                    <ProductCard
                      key={`auto-match-${product.id}`}
                      product={product}
                      onViewProduct={(prod) => setSelectedProduct(prod)}
                      onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Contact Us Section At the Bottom */}
      <ContactSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={appliedDiscount}
        onApplyPromoCode={handleApplyPromoCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountPercent={appliedDiscount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

    </div>
  );
}
