"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/app/types/cart.types";
import { useCart } from "@/app/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="cart-item__img"
          />
        ) : (
          <div className="cart-item__placeholder">
            <span>🍽️</span>
          </div>
        )}
      </div>

      <div className="cart-item__details">
        <h4 className="cart-item__title">{item.title}</h4>
        {item.description && (
          <p className="cart-item__description">{item.description}</p>
        )}
        <span className="cart-item__price">${item.price.toFixed(2)}</span>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="cart-item__qty-value">{item.quantity}</span>
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="cart-item__total">
          <span>${itemTotal}</span>
        </div>

        <button
          type="button"
          className="cart-item__remove"
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from cart`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
