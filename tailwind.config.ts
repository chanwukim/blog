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
            "--tw-prose-body": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-headings": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-lead": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-links": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-bold": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-counters": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-bullets": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-hr": "rgb(var(--border))",
            "--tw-prose-quotes": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-quote-borders": "rgb(var(--border))",
            "--tw-prose-captions": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-code": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-pre-code": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-pre-bg": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-th-borders": "rgb(var(--border))",
            "--tw-prose-td-borders": "rgb(var(--border))",

            "--tw-prose-invert-body": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-headings": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-lead": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-links": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-bold": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-counters": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-bullets": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-hr": "rgb(var(--border))",
            "--tw-prose-invert-quotes": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-quote-borders": "rgb(var(--border))",
            "--tw-prose-invert-captions": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-code": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-pre-code": "rgb(var(--foreground)/ 0.87)",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "rgb(var(--border))",
            "--tw-prose-invert-td-borders": "rgb(var(--border))",

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
            li: {
              fontSize: theme("fontSize.sm")[0],
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            "blockquote p": { fontStyle: "normal", fontWeight: "400" },
            blockquote: {
              paddingTop: theme("spacing.4"),
              paddingBottom: theme("spacing.4"),
              paddingRight: theme("spacing.2"),
              backgroundColor: "rgb(var(--background-muted) / 1)",
            },
            pre: {
              borderRadius: "0",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            code: {
              padding: ".2em .4em",
              borderRadius: theme("borderRadius.sm"),
              backgroundColor: "rgba(var(--background-muted) / 1)",
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
