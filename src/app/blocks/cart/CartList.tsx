"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import CartItem from "./CartItem";

const CartList: React.FC = () => {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-list cart-list--empty">
        <div className="cart-list__empty-state">
          <span className="cart-list__empty-icon">🛒</span>
          <h3 className="cart-list__empty-title">Your cart is empty</h3>
          <p className="cart-list__empty-text">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/menu" className="btn btn__default">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-list">
      <div className="cart-list__header">
        <h3 className="cart-list__title">Your Cart ({items.length} items)</h3>
        <button type="button" className="cart-list__clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-list__items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartList;
