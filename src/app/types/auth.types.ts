import { UserProfile, BillingAddress } from "./user.types";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  provider?: SocialProvider;
  phone?: string;
  billingAddress?: BillingAddress;
}

export type SocialProvider = "google" | "facebook";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType extends AuthState {
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (
    credentials: SignupCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (
    provider: SocialProvider
  ) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: {
    name: string;
    phone: string;
  }) => Promise<{ success: boolean; error?: string }>;
  updateBillingAddress: (
    data: BillingAddress
  ) => Promise<{ success: boolean; error?: string }>;
}

export interface StoredUser extends User {
  password: string;
}
