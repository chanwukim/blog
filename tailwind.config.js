/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.neutral.900") + "f2",
            h1: {
              fontSize: theme("fontSize.2xl")[0],
            },
            h2: {
              fontSize: theme("fontSize.xl")[0],
              marginTop: "1.875rem",
              marginBottom: "0.75em",
            },
            h3: {
              fontSize: theme("fontSize.base")[0],
            },
            p: {
              fontSize: theme("fontSize.sm")[0],
              marginTop: "0",
              marginBottom: "0",
            }, // 14px
            li: {
              fontSize: theme("fontSize.sm")[0],
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            }, // 14px and 4px
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            "blockquote p": { fontStyle: "normal", fontWeight: "400" },
            blockquote: {
              color: theme("colors.gray.700"),
              paddingTop: theme("spacing.1"),
              paddingBottom: theme("spacing.1"),
              paddingRight: theme("spacing.2"),
              backgroundColor: theme("colors.gray.50"),
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            code: {
              color: theme("colors.gray.800"),
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.1") + " " + theme("spacing.2"), // 4px 8px
              borderRadius: theme("borderRadius.sm"), // 4px
              fontSize: "0.8em",
              fontWeight: "500",
            },
            img: {
              borderRadius: theme("borderRadius.sm"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
