import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./pretendard-variable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  /**
   * @see https://systemfontstack.com
   */
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "avenir next",
    "avenir",
    "segoe ui",
    "helvetica neue",
    "Cantarell",
    "Ubuntu",
    "roboto",
    "helvetica",
    "arial",
    "sans-serif",
  ],
});
