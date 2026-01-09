import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { SignupForm } from "@/app/blocks/auth";
import { HeroInnerSignupData } from "@/app/hooks/data-auth-cart";

const SignupPage = () => {
  return (
    <div className="auth-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerSignupData.title}
        image={HeroInnerSignupData.image}
        altText={HeroInnerSignupData.altText}
        breadcrumbs={HeroInnerSignupData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Auth Form Section */}
      <section className="auth-section">
        <div className="auth-section__container">
          <SignupForm />
        </div>
      </section>
      {/* / Auth Form Section */}
    </div>
  );
};

export default SignupPage;
