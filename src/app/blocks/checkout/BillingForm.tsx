"use client";

import React from "react";
import { BillingInfo } from "@/app/types/checkout.types";

interface BillingFormProps {
  billingInfo: BillingInfo;
  onChange: (info: BillingInfo) => void;
  disabled?: boolean;
}

const BillingForm: React.FC<BillingFormProps> = ({
  billingInfo,
  onChange,
  disabled = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...billingInfo, [name]: value });
  };

  return (
    <div className="billing-form">
      <h3 className="billing-form__title">Billing Information</h3>

      <div className="billing-form__fields">
        <div className="form_field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={billingInfo.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            disabled={disabled}
          />
        </div>

        <div className="billing-form__row">
          <div className="form_field">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={billingInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={disabled}
            />
          </div>

          <div className="form_field">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={billingInfo.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="form_field">
          <label htmlFor="address">Delivery Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={billingInfo.address}
            onChange={handleChange}
            placeholder="Enter your full delivery address"
            required
            disabled={disabled}
          />
        </div>

        <div className="form_field">
          <label htmlFor="notes">Order Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={billingInfo.notes || ""}
            onChange={handleChange}
            placeholder="Any special instructions for your order..."
            rows={3}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
