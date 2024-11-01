import type { ExtendTheme } from "@pigment-css/react/theme";

interface Theme {
  foreground: string;
  foregroundMuted: string;
  background: string;
  backgroundMuted: string;
}

declare module "@pigment-css/react/theme" {
  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: "light" | "dark";
      tokens: Theme;
    }>;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: Theme) => React.CSSProperties)
        | ReadonlyArray<
            React.CSSProperties | ((theme: Theme) => React.CSSProperties)
          >;
    }
  }
}
