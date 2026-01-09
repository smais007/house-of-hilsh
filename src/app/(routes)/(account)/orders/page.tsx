"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { HeroInnerOrdersData } from "@/app/hooks/data-auth-cart";
import { OrdersList } from "@/app/blocks/orders";

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login?redirect=/orders");
      } else {
        setIsReady(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <HeroInnerBlock
        title={HeroInnerOrdersData.title}
        image={HeroInnerOrdersData.image}
        altText={HeroInnerOrdersData.altText}
        breadcrumbs={HeroInnerOrdersData.breadcrumbs}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-bold text-text-base">
              Your Orders
            </h2>
            <OrdersList />
          </div>
        </div>
      </section>
    </>
  );
}
