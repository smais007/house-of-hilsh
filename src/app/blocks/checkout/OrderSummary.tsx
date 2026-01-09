"use client";

import React from "react";
import { CartItem } from "@/app/types/cart.types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFee = 0,
}) => {
  const total = subtotal + deliveryFee;

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">Order Summary</h3>

      <div className="order-summary__items">
        {items.map((item) => (
          <div key={item.id} className="order-summary__item">
            <div className="order-summary__item-info">
              <span className="order-summary__item-qty">{item.quantity}×</span>
              <span className="order-summary__item-name">{item.title}</span>
            </div>
            <span className="order-summary__item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__totals">
        <div className="order-summary__row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="order-summary__row">
          <span>Delivery</span>
          <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
        </div>
        <div className="order-summary__row order-summary__row--total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
