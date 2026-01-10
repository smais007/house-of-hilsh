import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { LoginForm } from "@/app/blocks/auth";
import { HeroInnerLoginData } from "@/app/hooks/data-auth-cart";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <HeroInnerBlock
        title={HeroInnerLoginData.title}
        image={HeroInnerLoginData.image}
        altText={HeroInnerLoginData.altText}
        breadcrumbs={HeroInnerLoginData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Auth Form Section */}
      <section className="auth-section">
        <div className="auth-section__container">
          <LoginForm />
        </div>
      </section>
      {/* / Auth Form Section */}
    </div>
  );
};

export default LoginPage;
