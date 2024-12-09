import styles from "./about.module.css";

import { Text } from "../ui/text";

export default function About() {
  return (
    <section className={styles.about}>
      <h2 className="sr-only">About</h2>
      <Text>
        좋은 사용자 반응을 얻는 것이 가장 큰 동기이며, 개선되는 과정을 즐기며
        아이디어를 현실로 만드는 데 보람을 느낍니다.
        <br />한 겨울에도 아이스아메리카노를 마십니다. 🧋
      </Text>
    </section>
  );
}
