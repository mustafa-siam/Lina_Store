import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-[#2a7d4f] text-white hover:bg-[#1e5c39] shadow-sm",
  secondary: "bg-amber-400 text-gray-900 hover:bg-amber-500 shadow-sm",
  outline: "border-2 border-[#2a7d4f] text-[#2a7d4f] hover:bg-[#2a7d4f] hover:text-white",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizeStyles = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7d4f]
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}
      `}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
