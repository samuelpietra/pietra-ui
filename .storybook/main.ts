import { mergeConfig } from "vite";
import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.stories.@(ts|tsx)",
    "../src/stories/**/*.mdx"
  ],
  addons: ["@storybook/addon-essentials"],
  docs: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config, { configDir }) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(configDir, "../src"),
        },
      },
    });
  },
};

export default config;
