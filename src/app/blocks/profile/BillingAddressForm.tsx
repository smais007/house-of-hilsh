"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const BillingAddressForm: React.FC = () => {
  const { user, updateBillingAddress } = useAuth();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.billingAddress) {
      setAddress(user.billingAddress.address || "");
      setNotes(user.billingAddress.notes || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!address.trim()) {
      setStatus("error");
      setMessage("Address is required.");
      return;
    }

    const result = await updateBillingAddress({
      address: address.trim(),
      notes: notes.trim() || undefined,
    });

    if (result.success) {
      setStatus("success");
      setMessage("Billing address updated successfully!");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } else {
      setStatus("error");
      setMessage(result.error || "Failed to update billing address.");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-6 text-lg font-semibold text-text-base">
        Billing Address
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="form_field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your billing address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={status === "loading"}
              required
            />
          </div>

          <div className="form_field">
            <label htmlFor="notes">
              Notes
              <span className="ml-2 text-xs text-text-muted">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Apartment number, delivery instructions, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={status === "loading"}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-text-base placeholder-text-muted transition-colors focus:border-primary focus:outline-none"
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
              {status === "loading" ? "Saving..." : "Save Address"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillingAddressForm;
