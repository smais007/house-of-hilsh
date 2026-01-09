import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { CheckoutSummary } from "@/app/blocks/cart";
import { HeroInnerCheckoutData } from "@/app/hooks/data-auth-cart";

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerCheckoutData.title}
        image={HeroInnerCheckoutData.image}
        altText={HeroInnerCheckoutData.altText}
        breadcrumbs={HeroInnerCheckoutData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Checkout Section */}
      <section className="checkout-section">
        <div className="checkout-section__container">
          <CheckoutSummary />
        </div>
      </section>
      {/* / Checkout Section */}
    </div>
  );
};

export default CheckoutPage;
