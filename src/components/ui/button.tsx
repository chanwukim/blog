import styles from "./button.module.css";

import cn from "@/lib/cn";
import type { PolymorphicComponentProps } from "@/lib/types";

export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentProps<
    C,
    {
      variant?: "default" | "light" | "outline" | "ghost";
      size?: "sm" | "md" | "lg";
      rounded?: "sm" | "md" | "lg" | "full";
    }
  >;

export function Button<C extends React.ElementType = "button">({
  as,
  variant = "default",
  size = "md",
  rounded = "md",
  className,
  ...rest
}: ButtonProps<C>) {
  const Component = as ?? "button";
  return (
    <Component
      className={cn(
        styles.button,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        styles[`rounded-${rounded}`],
        className,
      )}
      {...rest}
    />
  );
}
