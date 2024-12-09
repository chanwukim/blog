import styles from "./profile.module.css";

import { SITE_CONFIG } from "@/lib/constants";

import { Avatar } from "../ui/avatar";
import { Text } from "../ui/text";
import { Title } from "../ui/title";

interface GithubStats {
  followers: number;
  following: number;
}

/**
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 */
async function fetchGithubStats(): Promise<GithubStats> {
  const response = await fetch(
    `https://api.github.com/users/${SITE_CONFIG.author.name}`,
    { next: { revalidate: 60 * 60 } }, // 1시간
  );

  if (!response.ok) {
    throw new Error("GitHub API 호출 실패");
  }

  const data = await response.json();

  return {
    followers: data.followers,
    following: data.following,
  };
}

export default async function Profile() {
  const githubStats = await fetchGithubStats();

  return (
    <div className={styles.profile}>
      <div>
        <Avatar src={SITE_CONFIG.author.image} alt="프로필 이미지" size={88} />
      </div>

      <Title size="title-1" weight="bold">
        {SITE_CONFIG.author.name}
      </Title>

      <div className={styles.stats}>
        <div>
          <Text weight="semibold">{githubStats.followers}</Text>{" "}
          <Text className="color-muted">followers</Text>
        </div>
        <div>
          <Text weight="semibold">{githubStats.following}</Text>{" "}
          <Text className="color-muted">following</Text>
        </div>
      </div>

      <p className={styles.description}>기록이 쌓이면 뭐든 된다</p>

      <div className={styles.social}>
        <Text
          as="a"
          href={SITE_CONFIG.author.github}
          target="_blank"
          className="link"
        >
          GitHub
        </Text>
      </div>
    </div>
  );
}
