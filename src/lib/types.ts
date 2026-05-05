/**
 * Domínio MASAYOSHI — tipos compartilhados entre frontend, mock e Supabase.
 */

export type ID = string;

export type Size = "PP" | "P" | "M" | "G" | "GG" | "XGG";

export type ProductCategory =
  | "tee"
  | "long-sleeve"
  | "hoodie"
  | "crewneck"
  | "outerwear"
  | "pants"
  | "shorts"
  | "headwear"
  | "accessory";

export type ProductStatus = "active" | "draft" | "sold-out" | "scheduled" | "archived";

export type Variant = {
  id: ID;
  size: Size;
  stock: number;
  sku: string;
};

export type Product = {
  id: ID;
  slug: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  dropId?: ID | null;
  drop?: Pick<Drop, "id" | "code" | "name"> | null;
  description: string;
  story?: string;
  composition?: string[];
  measurements?: Record<Size, { chest: number; length: number; shoulder: number; sleeve?: number }>;
  priceCents: number;
  comparePriceCents?: number | null;
  imageFront: string;
  imageBack: string;
  imageGallery?: string[];
  imageHover?: string;
  variants: Variant[];
  badges?: ("limited" | "new" | "last-units" | "exclusive" | "archive")[];
  status: ProductStatus;
  releaseAt?: string;
  createdAt: string;
  position?: number;
};

export type Drop = {
  id: ID;
  code: string;
  name: string;
  tagline: string;
  story: string;
  cover: string;
  poster?: string;
  videoUrl?: string;
  status: "live" | "scheduled" | "sold-out" | "archived";
  releaseAt: string;
  endsAt?: string;
  productCount: number;
  totalUnits?: number;
  ordemNumero: string;
  createdAt: string;
};

export type Banner = {
  id: ID;
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  position: "hero" | "secondary" | "marquee";
  active: boolean;
  order: number;
};

export type CartItem = {
  productId: ID;
  variantId: ID;
  slug: string;
  name: string;
  size: Size;
  priceCents: number;
  image: string;
  quantity: number;
  maxStock: number;
  dropCode?: string;
};

export type Address = {
  fullName: string;
  cpf?: string;
  phone: string;
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
};

export type ShippingMethod = {
  id: string;
  carrier: string;
  service: string;
  priceCents: number;
  etaDays: number;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "canceled"
  | "refunded";

export type OrderItem = {
  productId: ID;
  variantId: ID;
  name: string;
  size: Size;
  image: string;
  priceCents: number;
  quantity: number;
};

export type Order = {
  id: ID;
  number: string;
  userId?: ID | null;
  email: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: "pix" | "credit_card" | "stripe" | "mp" | "apple_pay" | "google_pay";
  trackingCode?: string | null;
  createdAt: string;
  paidAt?: string | null;
};

export type Profile = {
  id: ID;
  email: string;
  fullName?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  role: "user" | "admin";
  createdAt: string;
};

export type Coupon = {
  code: string;
  discountType: "percent" | "fixed";
  value: number;
  minimumCents?: number;
  expiresAt?: string;
  active: boolean;
};
