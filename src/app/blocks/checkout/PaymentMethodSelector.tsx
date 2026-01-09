"use client";

import React from "react";
import { PaymentMethod, PAYMENT_METHODS } from "@/app/types/checkout.types";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  disabled?: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selected,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="payment-selector">
      <h3 className="payment-selector__title">Payment Method</h3>

      <div className="payment-selector__options">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`payment-selector__option ${
              selected === method.id ? "payment-selector__option--selected" : ""
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              disabled={disabled}
              className="payment-selector__radio"
            />
            <div className="payment-selector__content">
              <div className="payment-selector__icon">
                {method.id === "cod" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                )}
              </div>
              <div className="payment-selector__info">
                <span className="payment-selector__label">{method.label}</span>
                <span className="payment-selector__description">
                  {method.description}
                </span>
              </div>
            </div>
            <div className="payment-selector__check">
              {selected === method.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </label>
        ))}
      </div>

      {selected === "stripe" && (
        <div className="payment-selector__stripe-notice">
          <p>
            <strong>Note:</strong> Stripe payment integration is coming soon.
            Please select Cash on Delivery for now.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
