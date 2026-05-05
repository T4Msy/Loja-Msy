"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  shippingCents: number;

  open: () => void;
  close: () => void;
  toggle: () => void;

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string | null) => void;
  setShipping: (cents: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      shippingCents: 0,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),

      addItem: (incoming) => {
        const items = [...get().items];
        const i = items.findIndex((x) => x.variantId === incoming.variantId);
        if (i >= 0) {
          const next = Math.min(items[i].quantity + incoming.quantity, items[i].maxStock);
          items[i] = { ...items[i], quantity: next };
        } else {
          items.push(incoming);
        }
        set({ items, isOpen: true });
      },

      removeItem: (variantId) =>
        set({ items: get().items.filter((x) => x.variantId !== variantId) }),

      updateQty: (variantId, qty) =>
        set({
          items: get().items.map((x) =>
            x.variantId === variantId
              ? { ...x, quantity: Math.max(1, Math.min(qty, x.maxStock)) }
              : x
          ),
        }),

      clear: () => set({ items: [], couponCode: null, shippingCents: 0 }),

      applyCoupon: (code) => set({ couponCode: code }),
      setShipping: (cents) => set({ shippingCents: cents }),
    }),
    {
      name: "msy-cart",
      partialize: (s) => ({
        items: s.items,
        couponCode: s.couponCode,
      }),
    }
  )
);

export const cartTotals = (state: CartState) => {
  const subtotal = state.items.reduce((sum, x) => sum + x.priceCents * x.quantity, 0);
  const itemCount = state.items.reduce((sum, x) => sum + x.quantity, 0);
  const total = subtotal + state.shippingCents;
  return { subtotal, itemCount, total };
};
