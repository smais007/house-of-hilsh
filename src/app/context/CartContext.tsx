"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { CartContextType, CartItem, CartState } from "@/app/types/cart.types";

const CART_STORAGE_KEY = "beef_cart";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  isDrawerOpen: false,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const calculateTotals = (
  items: CartItem[]
): { totalItems: number; subtotal: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, subtotal };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CartState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      const totals = calculateTotals(items);
      setState((prev) => ({ ...prev, items, ...totals }));
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, isHydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setState((prev) => {
        const existingItemIndex = prev.items.findIndex((i) => i.id === item.id);

        let newItems: CartItem[];
        if (existingItemIndex > -1) {
          newItems = prev.items.map((i, index) =>
            index === existingItemIndex
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          newItems = [...prev.items, { ...item, quantity }];
        }

        const totals = calculateTotals(newItems);
        return { ...prev, items: newItems, ...totals };
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      const totals = calculateTotals(newItems);
      return { ...prev, items: newItems, ...totals };
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setState((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const totals = calculateTotals(newItems);
      return { ...prev, items: newItems, ...totals };
    });
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...initialState, isDrawerOpen: prev.isDrawerOpen }));
  }, []);

  const getItemQuantity = useCallback(
    (id: string): number => {
      const item = state.items.find((i) => i.id === id);
      return item?.quantity ?? 0;
    },
    [state.items]
  );

  const openDrawer = useCallback(() => {
    setState((prev) => ({ ...prev, isDrawerOpen: true }));
  }, []);

  const closeDrawer = useCallback(() => {
    setState((prev) => ({ ...prev, isDrawerOpen: false }));
  }, []);

  const setDrawerOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isDrawerOpen: open }));
  }, []);

  const value = useMemo<CartContextType>(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
      openDrawer,
      closeDrawer,
      setDrawerOpen,
    }),
    [
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
      openDrawer,
      closeDrawer,
      setDrawerOpen,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
