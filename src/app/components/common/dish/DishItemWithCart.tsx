"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";

interface DishItemWithCartProps {
  id: string | number;
  title: string;
  price: string;
  description: string;
  image?: string;
}

const DishItemWithCart: React.FC<DishItemWithCartProps> = ({
  id,
  title,
  price,
  description,
  image,
}) => {
  const { addItem, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  // Parse price string to number (e.g., "$29.00" -> 29.00)
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
  const itemId = String(id);
  const currentCartQty = getItemQuantity(itemId);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: itemId,
        title,
        price: numericPrice,
        description,
        image,
      },
      quantity
    );

    // Show feedback
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);

    // Reset quantity selector
    setQuantity(1);
  };

  // Early return if essential data is missing
  if (!title || !price) {
    return null;
  }

  return (
    <div className="dish dish--with-cart" role="article">
      <div className="dish__main">
        <div className="dish__content">
          <h4 className="dish__title">{title}</h4>
          <span className="dish__price" aria-label={`Price: ${price}`}>
            {price}
          </span>
        </div>
        {description && (
          <div className="dish__description">
            <span>{description}</span>
          </div>
        )}
      </div>

      <div className="dish__cart-controls">
        <div className="dish__quantity">
          <button
            type="button"
            className="dish__qty-btn"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="dish__qty-value">{quantity}</span>
          <button
            type="button"
            className="dish__qty-btn"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={`dish__add-btn ${showAdded ? "dish__add-btn--added" : ""}`}
          onClick={handleAddToCart}
          aria-label={`Add ${title} to cart`}
        >
          {showAdded ? "Added!" : "Add to Cart"}
        </button>

        {currentCartQty > 0 && (
          <span className="dish__in-cart">{currentCartQty} in cart</span>
        )}
      </div>
    </div>
  );
};

export default DishItemWithCart;
