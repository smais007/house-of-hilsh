import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { ForgotPasswordForm } from "@/app/blocks/auth";
import { HeroInnerForgotPasswordData } from "@/app/hooks/data-auth-cart";

const ForgotPasswordPage = () => {
  return (
    <div className="auth-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerForgotPasswordData.title}
        image={HeroInnerForgotPasswordData.image}
        altText={HeroInnerForgotPasswordData.altText}
        breadcrumbs={HeroInnerForgotPasswordData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Auth Form Section */}
      <section className="auth-section">
        <div className="auth-section__container">
          <ForgotPasswordForm />
        </div>
      </section>
      {/* / Auth Form Section */}
    </div>
  );
};

export default ForgotPasswordPage;
