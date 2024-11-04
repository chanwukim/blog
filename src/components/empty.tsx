import styles from "./empty.module.css";

import Link from "next/link";

export default function Empty() {
  return (
    <div className={styles.empty}>
      아무 것도 없어요.
      <div className={styles.actions}>
        <Link href="/" className="button">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
