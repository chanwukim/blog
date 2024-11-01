import type { NextConfig } from "next";

import { withPigment, extendTheme } from "@pigment-css/nextjs-plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default withPigment(nextConfig, {
  theme: extendTheme({
    colorSchemes: {
      light: {
        colors: {
          foreground: "#000000DE",
          foregroundMuted: "#000000A1",
          background: "#FFFFFF",
          backgroundMuted: "#F5F5F5",
        },
      },
      dark: {
        colors: {
          foreground: "#FFFFFFDE",
          foregroundMuted: "#FFFFFFA1",
          background: "#1B1E1B",
          backgroundMuted: "#2B2D2D",
        },
      },
    },
  }),
});
