export type ProductCategory =
  | 'All'
  | 'Electronics'
  | 'Kitchen'
  | 'Home & Living'
  | 'Toys'
  | 'Accessories'
  | 'Shoes'
  | 'Sports Equipment'
  | 'Clothing & Fashion';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderDetails {
  orderId: string;
  customer: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  paymentMethod: 'card' | 'cod' | 'apple_pay';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  estimatedTax: number;
  totalPrice: number;
  orderDate: string;
  estimatedDelivery: string;
  status: 'Confirmed' | 'Processing' | 'Shipped';
}
