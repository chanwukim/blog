import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(var(--background) / <alpha-value>)",
          muted: "rgb(var(--background-muted) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--foreground) / 0.87)",
          muted: "rgb(var(--foreground-muted) / 0.55)",
          disabled: "rgb(var(--foreground-disabled) / 0.4)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": `${theme("colors.neutral.900")}f2`,
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
            },
            a: {
              color: theme("colors.foreground"),
              fontWeight: 400,
              textDecoration: "none",
              borderBottomWidth: theme("borderWidth.DEFAULT"),
              borderBottomStyle: "solid",
              borderColor: theme("colors.foreground-muted"),
            },
            li: {
              fontSize: theme("fontSize.sm")[0],
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
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
              padding: ".2em .4em",
              borderRadius: theme("borderRadius.sm"),
              fontSize: "0.85em",
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
  plugins: [typography],
};

export default config;
