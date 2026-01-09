"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { SocialProvider } from "@/app/types/auth.types";

type FormStatus = "idle" | "loading" | "success" | "error";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, socialLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const result = await login({ email, password });

    if (result.success) {
      setStatus("success");
      router.push("/");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Login failed. Please try again.");
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setStatus("loading");
    setErrorMessage("");

    const result = await socialLogin(provider);

    if (result.success) {
      setStatus("success");
      router.push("/");
    } else {
      setStatus("error");
      setErrorMessage(
        result.error || `${provider} login failed. Please try again.`
      );
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">Welcome Back</h2>
        <p className="auth-form__subtitle">Sign in to your account</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__body">
          <div className="form_field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
          </div>

          <div className="form_field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && (
            <p className="form-error-message">{errorMessage}</p>
          )}

          <div className="form_field">
            <button
              type="submit"
              className="btn btn__default btn__full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="auth-form__divider">
            <span>or continue with</span>
          </div>

          <div className="auth-form__social">
            <button
              type="button"
              className="btn btn__social btn__social--google"
              onClick={() => handleSocialLogin("google")}
              disabled={status === "loading"}
            >
              <svg
                className="btn__social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="btn btn__social btn__social--facebook"
              onClick={() => handleSocialLogin("facebook")}
              disabled={status === "loading"}
            >
              <svg
                className="btn__social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <div className="auth-form__footer">
          <Link href="/forgot-password" className="auth-form__link">
            Forgot your password?
          </Link>
          <p className="auth-form__text">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-form__link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
