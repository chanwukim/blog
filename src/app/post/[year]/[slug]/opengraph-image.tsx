// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx

import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/lib/constants";
import { getPostBySlug } from "@/lib/post";

// Image metadata
export const alt = "Blog post image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { year: string; slug: string };
}) {
  const { year, slug } = params;
  const post = await getPostBySlug(`${year}/${slug}`);

  if (!post) {
    return null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${SITE_CONFIG.url}/og.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    },
  );
}
