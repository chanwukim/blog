import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
