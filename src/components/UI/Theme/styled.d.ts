import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      textPrimary: string;
      textSecondary: string;
      divider: string;
    };
    borderRadius: string;
    padding: number;
    spacing: (padding: number) => string;
  }
}
