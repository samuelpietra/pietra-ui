import { addons } from "@storybook/manager-api";

import storybookThemes from "./storybook-themes";

addons.setConfig({
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? storybookThemes.dark
    : storybookThemes.light
})
