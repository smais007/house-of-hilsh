"use client";

import React from "react";
import {
  Order,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "@/app/types/order.types";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodLabel = (method: string): string => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "stripe":
        return "Credit Card";
      default:
        return method;
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-text-base">
            Order #{order.id}
          </p>
          <p className="text-xs text-text-muted">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
            ORDER_STATUS_COLORS[order.status]
          }`}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* Items */}
      <div className="mb-4 space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-text-base">
              {item.title}
              <span className="ml-1 text-text-muted">x{item.quantity}</span>
            </span>
            <span className="text-text-muted">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-text-muted">
          <span className="font-medium text-text-base">Payment:</span>{" "}
          {getPaymentMethodLabel(order.paymentMethod)}
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted">Total</p>
          <p className="text-lg font-semibold text-primary">
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mt-4 rounded-md bg-surface-dark/30 p-3">
        <p className="text-xs font-medium text-text-muted">Delivery Address</p>
        <p className="text-sm text-text-base">{order.billingInfo.address}</p>
        {order.billingInfo.notes && (
          <p className="mt-1 text-xs text-text-muted">
            Note: {order.billingInfo.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
