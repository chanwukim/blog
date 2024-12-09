import styles from "./empty.module.css";

import Link from "next/link";

import { Button } from "../ui/button";
import { Title } from "../ui/title";

export default function Empty() {
  return (
    <div className={styles.empty}>
      <Title as="h3" weight="bold">
        아무 것도 없어요.
      </Title>
      <div className={styles.actions}>
        <Button as={Link} href="/" variant="light">
          홈으로
        </Button>
      </div>
    </div>
  );
}
