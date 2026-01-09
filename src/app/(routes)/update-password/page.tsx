import HeroInnerBlock from "@/app/components/common/hero-inner/Hero-inner";
import { UpdatePasswordForm } from "@/app/blocks/auth";
import { HeroInnerUpdatePasswordData } from "@/app/hooks/data-auth-cart";

const UpdatePasswordPage = () => {
  return (
    <div className="auth-page">
      {/* Hero Inner - Block */}
      <HeroInnerBlock
        title={HeroInnerUpdatePasswordData.title}
        image={HeroInnerUpdatePasswordData.image}
        altText={HeroInnerUpdatePasswordData.altText}
        breadcrumbs={HeroInnerUpdatePasswordData.breadcrumbs}
      />
      {/* / Hero Inner - Block */}

      {/* Auth Form Section */}
      <section className="auth-section">
        <div className="auth-section__container">
          <UpdatePasswordForm />
        </div>
      </section>
      {/* / Auth Form Section */}
    </div>
  );
};

export default UpdatePasswordPage;
