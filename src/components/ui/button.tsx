import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

type ButtonAnimations = {
  [key: string]: {
    whileHover: object;
    whileTap: object;
    transition: object;
  };
};

const buttonAnimations: ButtonAnimations = {
  default: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  primary: {
    whileHover: {},
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  icon: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  outline: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  ghost: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  destructive: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
  list: {
    whileHover: {},
    whileTap: { scale: 0.98, opacity: 0.8 },
    transition: { type: "spring", stiffness: 1000, damping: 20 },
  },
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "rounded-full bg-accent hover:bg-border disabled:opacity-100",
        list: "justify-start rounded-sm bg-transparent gap-3 text-lg font-normal hover:bg-secondary/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "p-0 w-12 h-12 aspect-square",
        list: "h-min py-2 px-4 w-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLMotionProps<"button">, ButtonProps>(
  (
    { className, variant, size, asChild = false, disabled, type = "button", ...props },
    ref
  ) => {
    const animation = variant
      ? buttonAnimations[variant]
      : buttonAnimations.default;
    return (
      <motion.button
        tabIndex={disabled ? -1 : undefined}
        whileHover={animation.whileHover}
        whileTap={animation.whileTap}
        transition={animation.transition}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
