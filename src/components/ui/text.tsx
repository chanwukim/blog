"use client";

import styles from "./text.module.css";

import React from "react";

import cn from "@/lib/cn";
import type { PolymorphicComponentProps } from "@/lib/types";

export type TextProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    size?: "body" | "caption" | "signal-1" | "signal-2";
    weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  }
>;

export function Text<C extends React.ElementType = "span">({
  as,
  size = "body",
  weight = "regular",
  className,
  ...rest
}: TextProps<C>) {
  const Component = as ?? "span";
  return (
    <Component
      className={cn(styles[size], styles[weight], className)}
      {...rest}
    />
  );
}
