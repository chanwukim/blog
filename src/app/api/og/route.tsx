import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/libs/constants";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || SITE_CONFIG.TITLE;
    const description =
      searchParams.get("description") || SITE_CONFIG.DESCRIPTION;
    // post, series, tag, default
    const type = searchParams.get("type") || "default";

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
            backgroundColor: "#09090b",
            color: "#fafafa",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* 배경 그라디언트 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
              display: "flex",
            }}
          />

          {/* 장식 요소들 */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "100px",
              height: "100px",
              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              opacity: 0.1,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "60px",
              height: "60px",
              background: "linear-gradient(45deg, #8b5cf6, #ec4899)",
              borderRadius: "50%",
              opacity: 0.1,
              display: "flex",
            }}
          />

          {/* 메인 컨텐츠 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
              maxWidth: "1000px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* 타입 뱃지 */}
            {type !== "default" && (
              <div
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "24px",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {type === "post" && "📄 포스트"}
                {type === "series" && "📚 시리즈"}
                {type === "tag" && "🏷️ 태그"}
              </div>
            )}

            {/* 제목 */}
            <div
              style={{
                fontSize: title.length > 30 ? "48px" : "64px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "24px",
                color: "#fafafa",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                display: "flex",
              }}
            >
              {title}
            </div>

            {/* 설명 */}
            {description && (
              <div
                style={{
                  fontSize: "24px",
                  color: "#a1a1aa",
                  lineHeight: "1.4",
                  marginBottom: "32px",
                  maxWidth: "800px",
                  display: "flex",
                }}
              >
                {description.length > 80
                  ? `${description.slice(0, 80)}...`
                  : description}
              </div>
            )}

            {/* 사이트 정보 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                color: "#71717a",
              }}
            >
              <div style={{ marginRight: "8px", display: "flex" }}>✨</div>
              <div style={{ display: "flex" }}>{SITE_CONFIG.TITLE}</div>
              <div style={{ margin: "0 12px", display: "flex" }}>•</div>
              <div style={{ display: "flex" }}>
                {SITE_CONFIG.URL.replace("https://", "")}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error("OG 이미지 생성 오류:", e);
    return new Response("OG 이미지 생성에 실패했습니다", { status: 500 });
  }
}
