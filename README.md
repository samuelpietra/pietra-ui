<p align="center">
  <a href="https://pietra-ui.vercel.app" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".storybook/public/images/full-logo-dark.svg" />
      <source media="(prefers-color-scheme: light)" srcset=".storybook/public/images/full-logo-light.svg" />
      <img alt="Pietra UI" src=".storybook/public/images/full-logo-dark.svg" width="300" />
    </picture>
  </a>
</p>

<p align="center">
  An opinionated component library built on top of <a href="https://www.radix-ui.com/themes">Radix Themes</a>.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Radix Themes" src="https://img.shields.io/badge/Radix_Themes-3-6E56CF?logo=radixui&logoColor=white" />
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## What is Pietra UI?

[Pietra UI](https://pietra-ui.vercel.app) extends [Radix Themes](https://www.radix-ui.com/themes) with higher-level, composition-first components that are tedious to build from scratch — compound data browsers, virtualized lists, and more. It keeps Radix's accessibility and theming while adding the patterns you actually need in production apps.

- Compound components that compose declaratively (like Radix itself)
- Virtualized views built-in for large datasets
- Fully typed with TypeScript
- Themed via Radix Themes — dark mode, accent colors, and radius tokens just work
- Override built-in aria-labels and button text via per-component props — bring your own i18n stack
- Documented with Storybook

## Installation

```bash
npm install pietra-ui react react-dom
```

## Quick Start

```tsx
import { ThemeProvider, Button, Text } from "pietra-ui";
import "pietra-ui/styles.css";

function App() {
  return (
    <ThemeProvider>
      <Text size="5" weight="bold">Hello Pietra</Text>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

## Localization

Pietra UI ships English defaults for the small handful of strings rendered by components themselves (close buttons, select-all checkboxes, etc.). Each is overridable via a prop — see the relevant component's Storybook page. The library does not bundle a translation framework; wire your app's i18n once and pass localized strings down.

## Development

```bash
npm install          # Install dependencies
npm run storybook    # Start Storybook on localhost:6006
npm run test         # Run tests with Vitest
npm run build        # Build with tsup
npm run typecheck    # Type-check with TypeScript
npm run lint         # Lint with Biome
```

## Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/samuelpietra" width="100px;" />
    </td>
  </tr>

  <td align="center">
    <a href="https://github.com/samuelpietra">
      <b>Samuel Pietra</b>
    </a>
  </td>
</table>
