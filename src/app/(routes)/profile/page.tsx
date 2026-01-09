"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { ProfileForm, BillingAddressForm } from "@/app/blocks/profile";
import { HeroInnerProfileData } from "@/app/hooks/data-auth-cart";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="profile-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerProfileData.title}
        image={HeroInnerProfileData.image}
        altText={HeroInnerProfileData.altText}
        breadcrumbs={HeroInnerProfileData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Profile Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-8">
            <ProfileForm />
            <BillingAddressForm />
          </div>
        </div>
      </section>
      {/* / Profile Section */}
    </div>
  );
};

export default ProfilePage;
