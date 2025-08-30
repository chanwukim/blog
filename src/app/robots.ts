import { SITE_CONFIG } from "@/libs/constants";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${SITE_CONFIG.URL}/sitemap.xml`,
    host: SITE_CONFIG.URL,
  };
}
