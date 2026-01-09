"use client";

import React from "react";

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  size = "md",
  onClick,
  className = "",
}) => {
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "U";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center rounded-full
        bg-primary text-white font-medium
        transition-all duration-200
        hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-surface
        focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-surface
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label="User menu"
    >
      {getInitials(name)}
    </button>
  );
};

export default UserAvatar;
