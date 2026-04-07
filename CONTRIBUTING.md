# Contributing to Pietra UI

Thanks for your interest in contributing!

## Getting Started

1. Fork this repository
2. Clone your fork and install dependencies:

```bash
npm install
```

3. Start Storybook for development:

```bash
npm run storybook
```

## Making Changes

1. Create a branch from latest remote `main`:

```bash
git checkout -b feature/new-stuff
```

2. Make your changes
3. Ensure all checks pass:

```bash
npm run lint
npm run typecheck
npm run test
```

4. Commit your changes and open a Pull Request

## Code Style

- This project uses [Biome](https://biomejs.dev) for linting and formatting — run `npm run lint:fix` to auto-fix
- Components follow the `forwardRef` pattern with explicit prop types
- **PascalCase** for components, **camelCase** for hooks, **kebab-case** for file names

## Reporting Issues

Got a problem? Open an issue [here](https://github.com/samuelpietra/pietra-ui/issues).
