/**
 * @param {import('plop').NodePlopAPI} plop
 */
function postGenerator(plop) {
  plop.setHelper("currentYear", () => new Date().getFullYear());
  plop.setHelper("currentDate", () => {
    const now = new Date();
    // YYYY-MM-DD 형식
    return now.toISOString().split("T")[0];
  });
  plop.setHelper("splitTags", (tags) => {
    if (!tags) return [];
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  });
  plop.setHelper("trimSlug", (slug) => {
    return slug ? slug.trim() : "";
  });

  plop.setGenerator("post", {
    description: "새 블로그 포스트 생성",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "📝 포스트 제목을 입력하세요:",
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return "제목은 필수입니다!";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "slug",
        message: "🔗 파일명(URL slug)을 입력하세요 (영문, 숫자, 하이픈만):",
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return "파일명은 필수입니다!";
          }
          if (!/^[a-z0-9-]+$/.test(input.trim())) {
            return "파일명은 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다!";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "📝 포스트 설명을 입력하세요:",
        default: "",
      },
      {
        type: "input",
        name: "series",
        message: "📚 시리즈명 (선택사항):",
        default: "",
      },
      {
        type: "input",
        name: "tags",
        message:
          "🏷️  태그를 쉼표로 구분해서 입력하세요 (필수, 예: React, TypeScript, Web):",
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return "태그는 최소 1개 이상 입력해야 합니다!";
          }
          const tags = input
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
          if (tags.length === 0) {
            return "유효한 태그를 최소 1개 이상 입력해주세요!";
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "isPublished",
        message: "🚀 바로 발행하시겠습니까?",
        default: false,
      },
    ],
    actions: [
      {
        type: "add",
        path: "posts/{{currentYear}}/{{trimSlug slug}}.md",
        templateFile: "templates/post.hbs",
      },
      {
        type: "add",
        path: "public/{{currentYear}}/{{trimSlug slug}}/.gitkeep",
        skipIfExists: true,
      },
      function (data) {
        const year = new Date().getFullYear();
        return `✅ 포스트가 생성되었습니다: posts/${year}/${data.slug.trim()}.md`;
      },
    ],
  });
}

export default postGenerator;
