export interface BillingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export type PaymentMethod = "cod" | "stripe";

export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon?: string;
}

export interface OrderState {
  billingInfo: BillingInfo | null;
  paymentMethod: PaymentMethod;
  isProcessing: boolean;
  isComplete: boolean;
  orderId: string | null;
}

export interface CheckoutFormData {
  billingInfo: BillingInfo;
  paymentMethod: PaymentMethod;
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
  {
    id: "stripe",
    label: "Credit/Debit Card",
    description: "Secure payment via Stripe",
  },
];
