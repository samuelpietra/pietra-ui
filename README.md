# pietra-ui

Opinionated component layer on [Radix Themes](https://www.radix-ui.com/themes).

## Installation

```bash
npm install pietra-ui react react-dom
```

## Usage

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

## Development

```bash
npm install
npm run storybook    # Storybook
npm run test         # Vitest
npm run build        # tsup
npm run typecheck    # TypeScript
```
