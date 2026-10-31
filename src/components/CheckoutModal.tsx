import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, Banknote, Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onOrderSuccess,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Shipping selection
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Error state & processing
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  
  // Standard is free if subtotal >= 75
  const standardFee = subtotal >= 75 ? 0 : 7.99;
  const shippingFee = shippingMethod === 'express' ? 14.99 : standardFee;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Contact phone number is required';
    if (!street.trim()) errs.street = 'Delivery address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!state.trim()) errs.state = 'State / Province is required';
    if (!postalCode.trim()) errs.postalCode = 'Postal / ZIP code is required';

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s+/g, '').length < 13) {
        errs.cardNumber = 'Valid card number is required';
      }
      if (!cardExpiry.trim()) errs.cardExpiry = 'Expiry required (MM/YY)';
      if (!cardCvc.trim() || cardCvc.length < 3) errs.cardCvc = 'CVC required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      
      const deliveryDateObj = new Date();
      deliveryDateObj.setDate(deliveryDateObj.getDate() + (shippingMethod === 'express' ? 2 : 4));
      const estimatedDelivery = deliveryDateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const orderData: OrderDetails = {
        orderId: generatedOrderId,
        customer: {
          fullName,
          email,
          phone,
        },
        deliveryAddress: {
          street,
          apartment,
          city,
          state,
          postalCode,
          country,
        },
        paymentMethod,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee,
        estimatedTax,
        totalPrice,
        orderDate,
        estimatedDelivery,
        status: 'Confirmed',
      };

      setIsSubmitting(false);
      onOrderSuccess(orderData);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Secure Checkout</span>
              </h2>
              <p className="text-xs text-slate-500">Provide your delivery address and contact information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Order Summary Layout */}
        <form onSubmit={handleSubmitOrder} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[82vh] overflow-y-auto">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Contact Information */}
            <section className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>1. Contact Information</span>
                <span className="text-xs font-normal text-slate-400">Order updates will be sent here</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* 2. Delivery Address */}
            <section className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>2. Delivery Address</span>
                <span className="text-xs font-normal text-slate-400">Where we should ship your goods</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="742 Evergreen Terrace"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                      errors.street ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.street && <p className="text-[11px] text-red-500 mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Seattle"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                        errors.city ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State / Region <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="WA"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                        errors.state ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.state && <p className="text-[11px] text-red-500 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ZIP / Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="98101"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors ${
                        errors.postalCode ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[11px] text-red-500 mt-1">{errors.postalCode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-600 transition-colors"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Shipping Options */}
            <section className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>3. Delivery Method</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 border rounded-xl flex items-start gap-3 cursor-pointer transition-colors ${
                  shippingMethod === 'standard' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="mt-0.5 text-blue-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">Standard Ground</span>
                      <span className="text-[11px] font-bold text-blue-600 tabular-nums">
                        {standardFee === 0 ? 'FREE' : `$${standardFee.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">3–5 business days delivery</p>
                  </div>
                </label>

                <label className={`p-3.5 border rounded-xl flex items-start gap-3 cursor-pointer transition-colors ${
                  shippingMethod === 'express' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="mt-0.5 text-blue-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">Priority Express</span>
                      <span className="text-[11px] font-bold text-slate-900 tabular-nums">$14.99</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">1–2 business days with courier tracking</p>
                  </div>
                </label>
              </div>
            </section>

            {/* 4. Payment Selection */}
            <section className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>4. Payment Method</span>
                <span className="text-xs font-normal text-slate-400">All transactions encrypted</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span>Cash on Delivery (COD)</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 ···· ···· 8921"
                      maxLength={19}
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-lg outline-none focus:border-blue-600 tabular-nums ${
                        errors.cardNumber ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/28"
                        maxLength={5}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg outline-none focus:border-blue-600 tabular-nums ${
                          errors.cardExpiry ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.cardExpiry && <p className="text-[11px] text-red-500 mt-1">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="···"
                        maxLength={4}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg outline-none focus:border-blue-600 tabular-nums ${
                          errors.cardCvc ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.cardCvc && <p className="text-[11px] text-red-500 mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-800">
                  <p className="font-semibold mb-1">Pay with Cash upon delivery</p>
                  <p className="text-amber-700 leading-relaxed text-[11px]">
                    You can inspect your package and pay the courier directly when your items arrive at your door.
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4 divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{item.product.name}</p>
                        <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount applied ({discountPercent}%)</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="tabular-nums font-semibold text-slate-900">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-slate-900">
                  <span className="text-sm font-bold">Total Price</span>
                  <span className="text-xl font-extrabold text-blue-600 tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order · ${totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Buyer Protection</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tracked Parcel</span>
                </span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
