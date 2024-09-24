"use client";

import cn from "@/lib/cn";

import type { PropsWithChidren } from "@/types";

import styles from "./accordion.module.css";

export function Accordion({ children, className }: PropsWithChidren<{ className?: string }>) {
  return <div className={cn(styles.accordion, className)}>{children}</div>;
}

export function AccordionTitle({ children, className }: PropsWithChidren<{ className?: string }>) {
  return (
    <div data-accordion-title className={cn(styles.title, className)}>
      <label
        tabIndex={0}
        role="button"
        className={styles.triggerWrap}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            (e.target as HTMLLabelElement).click();
          }
        }}
      >
        <input type="checkbox" data-accordion-trigger className={styles.trigger} />
        <span data-accordion-expand className={styles.expand}>
          {children}
        </span>
        <span data-accordion-collapse className={styles.collapse}>
          접기
        </span>
      </label>
    </div>
  );
}

export function AccordionContent({
  children,
  className,
}: PropsWithChidren<{ className?: string }>) {
  return (
    <div data-accordion-content className={cn(styles.content, className)}>
      {children}
    </div>
  );
}
