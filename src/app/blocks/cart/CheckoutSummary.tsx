"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import {
  BillingForm,
  PaymentMethodSelector,
  OrderSummary,
} from "@/app/blocks/checkout";
import { BillingInfo, PaymentMethod } from "@/app/types/checkout.types";
import { Order, OrderItem } from "@/app/types/order.types";

const ORDERS_STORAGE_KEY = "beef_orders";

const initialBillingInfo: BillingInfo = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

const CheckoutSummary: React.FC = () => {
  const router = useRouter();
  const { items, totalItems, subtotal, clearCart, openDrawer } = useCart();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [billingInfo, setBillingInfo] =
    useState<BillingInfo>(initialBillingInfo);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [formError, setFormError] = useState<string | null>(null);

  // Pre-fill user info when authenticated
  useEffect(() => {
    if (user && !billingInfo.fullName) {
      setBillingInfo((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user, billingInfo.fullName]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [isAuthenticated, isLoading, router]);

  // Redirect if cart is empty (and not just completed order)
  useEffect(() => {
    if (!isLoading && items.length === 0 && !orderComplete) {
      router.push("/menu");
    }
  }, [items.length, isLoading, router, orderComplete]);

  const validateForm = (): boolean => {
    if (!billingInfo.fullName.trim()) {
      setFormError("Please enter your full name.");
      return false;
    }
    if (!billingInfo.email.trim() || !billingInfo.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    if (!billingInfo.phone.trim()) {
      setFormError("Please enter your phone number.");
      return false;
    }
    if (!billingInfo.address.trim()) {
      setFormError("Please enter your delivery address.");
      return false;
    }
    if (paymentMethod === "stripe") {
      setFormError(
        "Stripe payment is not available yet. Please select Cash on Delivery."
      );
      return false;
    }
    setFormError(null);
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock order ID
    const mockOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(mockOrderId);

    // Create order object
    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const newOrder: Order = {
      id: mockOrderId,
      userId: user?.id || "",
      items: orderItems,
      subtotal: subtotal,
      deliveryFee: 0, // Free delivery
      total: subtotal, // Add tax/shipping if needed
      status: "pending",
      paymentMethod: paymentMethod,
      billingInfo: {
        fullName: billingInfo.fullName,
        email: billingInfo.email,
        phone: billingInfo.phone,
        address: billingInfo.address,
        notes: billingInfo.notes,
      },
      createdAt: new Date().toISOString(),
    };

    // Save order to localStorage
    const existingOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: Order[] = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    clearCart();
    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="checkout-page__loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success">
          <span className="checkout-success__icon">✓</span>
          <h2 className="checkout-success__title">
            Order Placed Successfully!
          </h2>
          <p className="checkout-success__order-id">
            Order ID: <strong>{orderId}</strong>
          </p>
          <p className="checkout-success__text">
            Thank you, {billingInfo.fullName}! Your order has been confirmed.
          </p>
          <p className="checkout-success__text">
            We&apos;ll send a confirmation to {billingInfo.email}.
          </p>
          <p className="checkout-success__text checkout-success__text--delivery">
            Delivery Address: {billingInfo.address}
          </p>
          <div className="checkout-success__actions">
            <Link href="/orders" className="btn btn__default">
              View Orders
            </Link>
            <Link href="/menu" className="btn btn__outline">
              Order More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page__content">
      <div className="checkout-page__main">
        {/* Billing Form */}
        <BillingForm
          billingInfo={billingInfo}
          onChange={setBillingInfo}
          disabled={isProcessing}
        />

        {/* Payment Method */}
        <PaymentMethodSelector
          selected={paymentMethod}
          onChange={setPaymentMethod}
          disabled={isProcessing}
        />

        {formError && (
          <div className="checkout-page__error">
            <p>{formError}</p>
          </div>
        )}

        <div className="checkout-page__submit">
          <button
            type="button"
            className="btn btn__default btn__full"
            onClick={handlePlaceOrder}
            disabled={isProcessing || paymentMethod === "stripe"}
          >
            {isProcessing
              ? "Processing..."
              : paymentMethod === "stripe"
              ? "Pay with Stripe (Coming Soon)"
              : `Place Order - $${subtotal.toFixed(2)}`}
          </button>
        </div>
      </div>

      <div className="checkout-page__sidebar">
        {/* Order Summary */}
        <OrderSummary items={items} subtotal={subtotal} />

        <button
          type="button"
          className="checkout-page__edit-cart"
          onClick={openDrawer}
        >
          Edit Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
