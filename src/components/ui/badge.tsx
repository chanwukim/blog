"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/cn";

const badgeVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        destructive:
          "bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent text-white",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        red: "border-transparent bg-red-400/20 text-red-700 group-data-hover:bg-red-400/30 dark:bg-red-400/10 dark:text-red-300 dark:group-data-hover:bg-red-400/15",
        orange:
          "border-transparent bg-orange-400/20 text-orange-700 group-data-hover:bg-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300 dark:group-data-hover:bg-orange-400/15",
        amber:
          "border-transparent bg-amber-400/20 text-amber-700 group-data-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:group-data-hover:bg-amber-400/15",
        yellow:
          "border-transparent bg-yellow-400/20 text-yellow-700 group-data-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-hover:bg-yellow-400/15",
        lime: "border-transparent bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15",
        green:
          "border-transparent bg-green-400/20 text-green-700 group-data-hover:bg-green-400/30 dark:bg-green-400/10 dark:text-green-300 dark:group-data-hover:bg-green-400/15",
        emerald:
          "border-transparent bg-emerald-400/20 text-emerald-700 group-data-hover:bg-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:group-data-hover:bg-emerald-400/15",
        teal: "border-transparent bg-teal-400/20 text-teal-700 group-data-hover:bg-teal-400/30 dark:bg-teal-400/10 dark:text-teal-300 dark:group-data-hover:bg-teal-400/15",
        cyan: "border-transparent bg-cyan-400/20 text-cyan-700 group-data-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-hover:bg-cyan-400/15",
        sky: "border-transparent bg-sky-400/20 text-sky-700 group-data-hover:bg-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300 dark:group-data-hover:bg-sky-400/15",
        blue: "border-transparent bg-blue-400/20 text-blue-700 group-data-hover:bg-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300 dark:group-data-hover:bg-blue-400/15",
        indigo:
          "border-transparent bg-indigo-400/20 text-indigo-700 group-data-hover:bg-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:group-data-hover:bg-indigo-400/15",
        violet:
          "border-transparent bg-violet-400/20 text-violet-700 group-data-hover:bg-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300 dark:group-data-hover:bg-violet-400/15",
        purple:
          "border-transparent bg-purple-400/20 text-purple-700 group-data-hover:bg-purple-400/30 dark:bg-purple-400/10 dark:text-purple-300 dark:group-data-hover:bg-purple-400/15",
        fuchsia:
          "border-transparent bg-fuchsia-400/20 text-fuchsia-700 group-data-hover:bg-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:group-data-hover:bg-fuchsia-400/15",
        pink: "border-transparent bg-pink-400/20 text-pink-700 group-data-hover:bg-pink-400/30 dark:bg-pink-400/10 dark:text-pink-300 dark:group-data-hover:bg-pink-400/15",
        rose: "border-transparent bg-rose-400/20 text-rose-700 group-data-hover:bg-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300 dark:group-data-hover:bg-rose-400/15",
        zinc: "border-transparent bg-zinc-400/20 text-zinc-700 group-data-hover:bg-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-300 dark:group-data-hover:bg-zinc-400/15",
      },
      size: {
        sm: "px-1 py-0.5 text-xs",
        default: "px-1.5 py-0.5 text-xs",
        lg: "px-2 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BadgeProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  variant,
  size,
  className,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
