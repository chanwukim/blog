import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { SITE_CONFIG } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${SITE_CONFIG.url}/og-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontSize: 48,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
