import styles from "./tag.module.css";

import { Badge } from "../ui/badge";

interface TagProps {
  name: string;
  active?: boolean;
}

export default function Tag({ name, active }: TagProps) {
  return (
    <Badge
      data-active={active}
      variant={active ? "default" : "light"}
      className={styles.tag}
    >
      <span className={styles.hashtag}>#</span>
      {name}
    </Badge>
  );
}
