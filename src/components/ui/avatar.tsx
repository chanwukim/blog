import styles from "./avatar.module.css";

import Image from "next/image";

export interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export function Avatar({ src, alt, size = 48 }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}
