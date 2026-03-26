import type { Preview } from "@storybook/react";
import type { ThemeProps } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { ThemeProvider } from "../src/theme";
import "../src/theme/pietra-theme.css";

const AvailableThemes: Record<string, {
  label: string;
  icon: string;
  appearance: ThemeProps["appearance"];
}> = {
  light: {
    label: "Pietra Light",
    icon: "sun",
    appearance: "light",
  },
  dark: {
    label: "Pietra Dark",
    icon: "moon",
    appearance: "dark",
  },
};

const getAppearance = (themeName: string) => {
  return AvailableThemes[themeName]?.appearance ?? "light";
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
          icon: theme.icon,
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, { globals }) => (
      <ThemeProvider appearance={getAppearance(globals.theme)}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      source: {
        type: "dynamic",
      },
    },
  },
};

export default preview;
