import { cn } from "@/libs/cn";
import { type PolymorphicComponentProps } from "@/libs/react";

export type HeadingProps<C extends React.ElementType = "h1"> =
  PolymorphicComponentProps<
    C,
    {
      level?: 1 | 2 | 3 | 4 | 5 | 6;
    }
  >;

export function Heading<C extends React.ElementType = "h1">({
  as,
  className,
  level = 1,
  ...rest
}: HeadingProps<C>) {
  const Component = as || `h${level}`;

  return (
    <Component
      className={cn("text-foreground-header break-words break-keep", className)}
      {...rest}
    />
  );
}
