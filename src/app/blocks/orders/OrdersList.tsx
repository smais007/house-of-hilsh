"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Order } from "@/app/types/order.types";
import { useAuth } from "@/app/context/AuthContext";
import OrderCard from "./OrderCard";

const ORDERS_STORAGE_KEY = "beef_orders";

const OrdersList: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        const allOrders: Order[] = JSON.parse(storedOrders);
        // Filter orders for current user and sort by most recent
        const userOrders = allOrders
          .filter((order) => order.userId === user.id)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setOrders(userOrders);
      }
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-text-muted">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-muted"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-base">
          No orders yet
        </h3>
        <p className="mb-6 text-sm text-text-muted">
          You haven&apos;t placed any orders yet. Start by browsing our menu!
        </p>
        <Link href="/menu" className="btn btn__default">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">
        {orders.length} {orders.length === 1 ? "order" : "orders"} found
      </p>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
