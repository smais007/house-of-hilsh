"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const ProfileForm: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!fullName.trim()) {
      setStatus("error");
      setMessage("Full name is required.");
      return;
    }

    const result = await updateProfile({
      name: fullName.trim(),
      phone: phone.trim(),
    });

    if (result.success) {
      setStatus("success");
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } else {
      setStatus("error");
      setMessage(result.error || "Failed to update profile.");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-6 text-lg font-semibold text-text-base">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="form_field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={status === "loading"}
              required
            />
          </div>

          <div className="form_field">
            <label htmlFor="email">
              Email
              <span className="ml-2 text-xs text-text-muted">
                (cannot be changed)
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              className="cursor-not-allowed opacity-60"
            />
          </div>

          <div className="form_field">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "loading"}
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                status === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="btn btn__default"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
