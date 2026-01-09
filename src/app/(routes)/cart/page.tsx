import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { CartList, CartSummary } from "@/app/blocks/cart";
import { HeroInnerCartData } from "@/app/hooks/data-auth-cart";

const CartPage = () => {
  return (
    <div className="cart-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerCartData.title}
        image={HeroInnerCartData.image}
        altText={HeroInnerCartData.altText}
        breadcrumbs={HeroInnerCartData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Cart Section */}
      <section className="cart-section">
        <div className="cart-section__container">
          <div className="cart-section__content">
            <div className="cart-section__list">
              <CartList />
            </div>
            <div className="cart-section__summary">
              <CartSummary />
            </div>
          </div>
        </div>
      </section>
      {/* / Cart Section */}
    </div>
  );
};

export default CartPage;
