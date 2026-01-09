"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

interface CartDrawerItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
  id,
  title,
  price,
  quantity,
  image,
}) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const itemTotal = price * quantity;

  return (
    <div className="group relative flex gap-4 rounded-lg border border-border/50 bg-surface-dark/30 p-3 transition-all hover:border-border hover:bg-surface-dark/50">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-surface-dark">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            🍽️
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between py-0.5">
        {/* Top: Title & Remove */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="line-clamp-2 text-sm font-medium leading-tight text-text-base">
            {title}
          </h4>
          <button
            type="button"
            onClick={() => removeItem(id)}
            className="flex-shrink-0 rounded p-1 text-text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
            aria-label={`Remove ${title} from cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
          </button>
        </div>

        {/* Bottom: Price, Quantity & Total */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-muted">
              ${price.toFixed(2)} each
            </span>
            {/* Quantity Controls */}
            <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="flex h-7 w-7 items-center justify-center text-sm text-text-muted transition-colors hover:text-text-base disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <span className="flex h-7 w-8 items-center justify-center text-sm font-medium text-text-base">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="flex h-7 w-7 items-center justify-center text-sm text-text-muted transition-colors hover:text-text-base"
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <span className="text-base font-semibold text-primary">
              ${itemTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
