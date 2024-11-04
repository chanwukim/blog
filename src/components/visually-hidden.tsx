import styles from "./visually-hidden.module.css";

import type { PropsWithChildren } from "@/lib/types";

interface VisuallyHiddenProps {
  as?: React.ElementType;
}

export default function VisuallyHidden({
  as,
  children,
}: PropsWithChildren<VisuallyHiddenProps>) {
  const Component = as ?? "span";
  return <Component className={styles.visuallyHidden}>{children}</Component>;
}
