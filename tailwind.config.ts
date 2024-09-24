import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          muted: "hsl(var(--background-muted) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
          muted: "hsl(var(--foreground-muted) / 0.63)",
        },
        border: "hsl(var(--border) / 0.23)",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-headings": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-lead": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-links": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-bold": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-counters": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-bullets": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-code": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-pre-code": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-pre-bg": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",

            "--tw-prose-invert-body": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-headings": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-lead": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-links": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-bold": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-counters": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-bullets": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-hr": "hsl(var(--border))",
            "--tw-prose-invert-quotes": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-quote-borders": "hsl(var(--border))",
            "--tw-prose-invert-captions": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-code": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-pre-code": "hsl(var(--foreground)/ 0.87)",
            "--tw-prose-invert-pre-bg": "hsl(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "hsl(var(--border))",
            "--tw-prose-invert-td-borders": "hsl(var(--border))",

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
            ul: {
              marginTop: "0.8em",
              marginBottom: "0.8em",
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
              backgroundColor: "hsl(var(--background-muted) / 1)",
            },
            pre: {
              borderRadius: "0",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            code: {
              padding: ".2em .4em",
              borderRadius: theme("borderRadius.sm"),
              backgroundColor: "hsla(var(--background-muted) / 1)",
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
