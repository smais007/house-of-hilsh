"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import CartDrawerItem from "./CartDrawerItem";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    isDrawerOpen,
    setDrawerOpen,
    clearCart,
  } = useCart();

  const deliveryFee = items.length > 0 ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      direction="right"
      shouldScaleBackground={false}
    >
      <DrawerContent className="fixed inset-y-0 right-0 left-auto flex h-full w-full max-w-md flex-col rounded-none border-l border-border bg-surface">
        {/* Header */}
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div>
              <DrawerTitle className="text-lg font-semibold text-text-base">
                Your Cart
              </DrawerTitle>
              <DrawerDescription className="text-xs text-text-muted">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </DrawerDescription>
            </div>
          </div>
          <DrawerClose className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DrawerClose>
        </DrawerHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-text-muted"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="mb-2 text-lg font-semibold text-text-base">
                Your cart is empty
              </p>
              <p className="mb-8 max-w-[200px] text-sm text-text-muted">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <DrawerClose asChild>
                <Link
                  href="/menu"
                  className="btn btn__default inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3h18v18H3z" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                  Browse Menu
                </Link>
              </DrawerClose>
            </div>
          ) : (
            <div className="px-6 py-4">
              {/* Clear Cart Button */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-text-muted">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-text-muted transition-colors hover:text-red-500"
                >
                  Clear all
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <DrawerFooter className="border-t border-border bg-surface-dark/30 px-6 py-5">
            {/* Summary */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-base">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Delivery</span>
                <span className="text-text-base">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-text-base">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <DrawerClose asChild>
              <Link
                href="/checkout"
                className="btn btn__default flex w-full items-center justify-center gap-2 py-3.5 text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                Proceed to Checkout
              </Link>
            </DrawerClose>
            <DrawerClose className="mt-1 block w-full py-2 text-center text-sm text-text-muted transition-colors hover:text-text-base">
              Continue Shopping
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
