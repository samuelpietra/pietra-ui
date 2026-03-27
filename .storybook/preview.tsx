import type { Preview } from "@storybook/react";
import type { ThemeProps } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { ThemeProvider } from "../src/theme";
import "../src/theme/pietra-theme.css";
import storybookThemes from "./storybook-themes";

const AvailableThemes: Record<string, {
  label: string;
  icon: string;
  appearance: ThemeProps["appearance"];
}> = {
  light: {
    label: "Pietra Light",
    icon: "sun",
    appearance: "light"
  },
  dark: {
    label: "Pietra Dark",
    icon: "moon",
    appearance: "dark"
  }
};

const getAppearance = (themeName: string) => {
  return AvailableThemes[themeName]?.appearance ?? "dark";
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: Object.entries(AvailableThemes).map(([key, theme]) => ({
          value: key,
          title: theme.label,
          icon: theme.icon
        })),
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  },
  decorators: [
    (Story, { globals }) => (
      <ThemeProvider appearance={getAppearance(globals.theme)}>
        <div style={{ padding: 8 }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    layout: "padded",
    docs: {
      source: {
        type: "dynamic"
      },
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? storybookThemes.dark
        : storybookThemes.light
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Theme", "Layout", "Typography", "Components"]
      }
    }
  }
};

export default preview;
