import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: number, size?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id && i.size === item.size);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id && i.size === existingItem.size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity }],
          });
        }
      },

      removeItem: (id, size?: string) => {
        set({
          items: get().items.filter((item) => 
            size !== undefined 
              ? !(item.id === id && item.size === size)
              : item.id !== id
          ),
        });
      },

      updateQuantity: (id, quantity, size?: string) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set({
          items: get().items.map((item) =>
            size !== undefined
              ? item.id === id && item.size === size
                ? { ...item, quantity }
                : item
              : item.id === id
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'futurewear-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
    }
  )
);

