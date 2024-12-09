import styles from "./title.module.css";

import cn from "@/lib/cn";
import type { PolymorphicComponentProps } from "@/lib/types";

export type TitleProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    size?:
      | "display-1"
      | "display-2"
      | "display-3"
      | "title-1"
      | "title-2"
      | "subtitle-1"
      | "subtitle-2";
    weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  }
>;

export function Title<C extends React.ElementType = "h1">({
  as,
  size = "title-1",
  weight = "regular",
  className,
  ...rest
}: TitleProps<C>) {
  const Component = as ?? "h1";
  return (
    <Component
      className={cn(styles[size], styles[weight], className)}
      {...rest}
    />
  );
}
