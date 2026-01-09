"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const ForgotPasswordForm: React.FC = () => {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await requestPasswordReset(email);

    if (result.success) {
      setStatus("success");
      setMessage(
        "If an account with this email exists, you will receive password reset instructions."
      );
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">Forgot Password</h2>
        <p className="auth-form__subtitle">
          Enter your email to reset your password
        </p>
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
              disabled={status === "loading" || status === "success"}
            />
          </div>

          {status === "success" && (
            <p className="form-success-message">{message}</p>
          )}

          {status === "error" && (
            <p className="form-error-message">{message}</p>
          )}

          <div className="form_field">
            <button
              type="submit"
              className="btn btn__default btn__full"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </div>

        <div className="auth-form__footer">
          <p className="auth-form__text">
            Remember your password?{" "}
            <Link href="/login" className="auth-form__link">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
