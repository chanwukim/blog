import { cn } from "@/libs/cn";
import { type PolymorphicComponentProps } from "@/libs/react";

export type TextProps<C extends React.ElementType = "p"> =
  PolymorphicComponentProps<C, {}>;

export function Text<C extends React.ElementType = "p">({
  as,
  className,
  ...rest
}: TextProps<C>) {
  const Component = as || "p";

  return (
    <Component
      data-component="text"
      className={cn("break-words break-keep", className)}
      {...rest}
    />
  );
}
