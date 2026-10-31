import React from 'react';
import { CheckCircle2, Package, Printer, ArrowRight, ShieldCheck, Truck, Home } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Order Confirmed!</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Thank you, <strong className="text-white">{order.customer.fullName}</strong>. Your order is being prepared for dispatch.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-full text-xs text-blue-300 font-mono">
            <span>Order Reference: {order.orderId}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Estimated Delivery Banner */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Estimated Delivery Arrival</p>
              <h4 className="text-sm font-bold text-slate-900">{order.estimatedDelivery}</h4>
              <p className="text-[11px] text-blue-700">Tracked shipping updates sent to {order.customer.email}</p>
            </div>
          </div>

          {/* Delivery & Customer Info Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-blue-600" />
                <span>Delivery Address</span>
              </h4>
              <p className="text-slate-700 font-medium">{order.customer.fullName}</p>
              <p className="text-slate-600">{order.deliveryAddress.street} {order.deliveryAddress.apartment}</p>
              <p className="text-slate-600">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}</p>
              <p className="text-slate-500 mt-1">{order.deliveryAddress.country}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Contact & Payment</span>
              </h4>
              <p className="text-slate-600"><strong>Email:</strong> {order.customer.email}</p>
              <p className="text-slate-600"><strong>Phone:</strong> {order.customer.phone}</p>
              <p className="text-slate-600 mt-2">
                <strong>Payment:</strong>{' '}
                {order.paymentMethod === 'card' ? 'Credit Card (Processed)' : 'Cash on Delivery (Pay on arrival)'}
              </p>
            </div>
          </div>

          {/* Itemized Order Summary */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-900">
              Purchased Items ({order.items.length})
            </div>
            <div className="divide-y divide-slate-100 p-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded border border-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{item.product.name}</p>
                      <p className="text-slate-500 text-[11px]">{item.product.brand} · Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50/70 p-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="tabular-nums font-medium text-slate-900">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="tabular-nums font-medium text-slate-900">
                  {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="tabular-nums font-medium text-slate-900">${order.estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid:</span>
                <span className="text-base text-blue-600 tabular-nums">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
