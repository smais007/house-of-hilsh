"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const UpdatePasswordForm: React.FC = () => {
  const router = useRouter();
  const { updatePassword, isAuthenticated, isLoading } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("New passwords do not match.");
      return;
    }

    const result = await updatePassword(currentPassword, newPassword);

    if (result.success) {
      setStatus("success");
      setMessage("Your password has been updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setStatus("error");
      setMessage(
        result.error || "Failed to update password. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="auth-form">
        <div className="auth-form__header">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">Update Password</h2>
        <p className="auth-form__subtitle">Change your account password</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__body">
          <div className="form_field">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={status === "loading"}
            />
          </div>

          <div className="form_field">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password (min. 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              disabled={status === "loading"}
            />
          </div>

          <div className="form_field">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={status === "loading"}
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
              disabled={status === "loading"}
            >
              {status === "loading" ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
