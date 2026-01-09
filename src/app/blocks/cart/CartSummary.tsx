"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const CartSummary: React.FC = () => {
  const { items, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>

      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-summary__divider"></div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary__actions">
        <Link href="/checkout" className="btn btn__default btn__full">
          Proceed to Checkout
        </Link>
        <Link href="/menu" className="btn btn__outline btn__full">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
