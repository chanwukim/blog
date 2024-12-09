import styles from "./badge.module.css";

import cn from "@/lib/cn";
import type { PolymorphicComponentProps } from "@/lib/types";

export type BadgeProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    variant?: "default" | "light" | "outline";
  }
>;

export function Badge<C extends React.ElementType = "span">({
  as,
  variant = "default",
  className,
  ...rest
}: BadgeProps<C>) {
  const Component = as ?? "span";
  return (
    <Component
      className={cn(styles.badge, styles[`variant-${variant}`], className)}
      {...rest}
    />
  );
}
