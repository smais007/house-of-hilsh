"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  AuthContextType,
  AuthState,
  LoginCredentials,
  SignupCredentials,
  User,
  StoredUser,
  SocialProvider,
} from "@/app/types/auth.types";
import { BillingAddress } from "@/app/types/user.types";

const AUTH_STORAGE_KEY = "beef_auth_user";
const USERS_STORAGE_KEY = "beef_users";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveStoredUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials
    ): Promise<{ success: boolean; error?: string }> => {
      const { email, password } = credentials;

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        return {
          success: false,
          error: "No account found with this email address.",
        };
      }

      if (foundUser.password !== password) {
        return { success: false, error: "Invalid password. Please try again." };
      }

      const { password: _, ...userWithoutPassword } = foundUser;

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(userWithoutPassword)
      );
      setState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const signup = useCallback(
    async (
      credentials: SignupCredentials
    ): Promise<{ success: boolean; error?: string }> => {
      const { name, email, password, confirmPassword } = credentials;

      if (password !== confirmPassword) {
        return { success: false, error: "Passwords do not match." };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters.",
        };
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        return {
          success: false,
          error: "An account with this email already exists.",
        };
      }

      const newUser: StoredUser = {
        id: generateId(),
        email,
        name,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveStoredUsers(users);

      const { password: _, ...userWithoutPassword } = newUser;

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(userWithoutPassword)
      );
      setState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    },
    []
  );

  const updatePassword = useCallback(
    async (
      currentPassword: string,
      newPassword: string
    ): Promise<{ success: boolean; error?: string }> => {
      if (!state.user) {
        return {
          success: false,
          error: "You must be logged in to update your password.",
        };
      }

      if (newPassword.length < 6) {
        return {
          success: false,
          error: "New password must be at least 6 characters.",
        };
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const userIndex = users.findIndex((u) => u.id === state.user?.id);

      if (userIndex === -1) {
        return { success: false, error: "User not found." };
      }

      if (users[userIndex].password !== currentPassword) {
        return { success: false, error: "Current password is incorrect." };
      }

      users[userIndex].password = newPassword;
      saveStoredUsers(users);

      return { success: true };
    },
    [state.user]
  );

  const requestPasswordReset = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        // For security, don't reveal if the email exists
        return { success: true };
      }

      // In a real app, this would send an email
      // For this mock, we'll just return success
      return { success: true };
    },
    []
  );

  const socialLogin = useCallback(
    async (
      provider: SocialProvider
    ): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay for OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock user data based on provider
      const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
      const mockEmail = `${provider}.user@example.com`;
      const mockName = `${providerName} User`;

      // Check if user already exists
      const users = getStoredUsers();
      let existingUser = users.find(
        (u) => u.email.toLowerCase() === mockEmail.toLowerCase()
      );

      if (!existingUser) {
        // Create new user from social login
        const newUser: StoredUser = {
          id: generateId(),
          email: mockEmail,
          name: mockName,
          password: "", // No password for social logins
          createdAt: new Date().toISOString(),
          provider,
        };

        users.push(newUser);
        saveStoredUsers(users);
        existingUser = newUser;
      }

      const { password: _, ...userWithoutPassword } = existingUser;
      const userWithProvider: User = { ...userWithoutPassword, provider };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithProvider));
      setState({
        user: userWithProvider,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    },
    []
  );

  const updateProfile = useCallback(
    async (data: {
      name: string;
      phone: string;
    }): Promise<{ success: boolean; error?: string }> => {
      if (!state.user) {
        return {
          success: false,
          error: "You must be logged in to update your profile.",
        };
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const userIndex = users.findIndex((u) => u.id === state.user?.id);

      if (userIndex === -1) {
        return { success: false, error: "User not found." };
      }

      // Update stored user
      users[userIndex].name = data.name;
      users[userIndex].phone = data.phone;
      saveStoredUsers(users);

      // Update current user state
      const updatedUser: User = {
        ...state.user,
        name: data.name,
        phone: data.phone,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      setState((prev) => ({
        ...prev,
        user: updatedUser,
      }));

      return { success: true };
    },
    [state.user]
  );

  const updateBillingAddress = useCallback(
    async (
      data: BillingAddress
    ): Promise<{ success: boolean; error?: string }> => {
      if (!state.user) {
        return {
          success: false,
          error: "You must be logged in to update your billing address.",
        };
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = getStoredUsers();
      const userIndex = users.findIndex((u) => u.id === state.user?.id);

      if (userIndex === -1) {
        return { success: false, error: "User not found." };
      }

      // Update stored user
      users[userIndex].billingAddress = data;
      saveStoredUsers(users);

      // Update current user state
      const updatedUser: User = {
        ...state.user,
        billingAddress: data,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      setState((prev) => ({
        ...prev,
        user: updatedUser,
      }));

      return { success: true };
    },
    [state.user]
  );

  const value = useMemo<AuthContextType>(
    () => ({
      ...state,
      login,
      logout,
      signup,
      socialLogin,
      updatePassword,
      requestPasswordReset,
      updateProfile,
      updateBillingAddress,
    }),
    [
      state,
      login,
      logout,
      signup,
      socialLogin,
      updatePassword,
      requestPasswordReset,
      updateProfile,
      updateBillingAddress,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
