# Coding conventions

General rules for writing component code in pietra-ui. Apply these across all components regardless of whether they wrap a Radix Themes primitive or are built from scratch.

## Props & types

- Prefer `interface` over `type` for component props. Use `type` only when `interface` isn't possible (generics with defaults, mapped types, unions).
- Props types live in the same file as the component. Inline props on inner/private components (not exported from the barrel) are acceptable.
- **Destructure props inline** at the component declaration — never via `const { ... } = props` in the body.
  - Good: `export const Example = ({ name, label, ...props }: ExampleProps) => ...`
  - Bad: `export const Example = (props: ExampleProps) => { const { name, label } = props; ... }`
  - Exception: when the component forwards props through without using them (e.g. thin Radix wrappers), `(props) => <X {...props} />` is fine — there's nothing to destructure.
- **Always name the spread `...props`** — never `...rest` or any other name. Even when destructuring specific fields alongside the spread:
  - Good: `({ name, label, ...props }) => <Box {...props} />`
  - Bad: `({ name, label, ...rest }) => <Box {...rest} />`

## Component identity

- Set `displayName` on every component using dot notation for subcomponents (e.g. `"ComponentName.Content"`).
- Use `forwardRef` on all components that render a DOM element (Trigger, Content, Close, etc.). Root/provider components that don't render a DOM element don't need it.

## Styling

- Use the `pietra-*` prefix for CSS classes.
- Use Radix Themes tokens for CSS values (`var(--space-*)`, `var(--gray-*)`, etc.) — never hardcoded values.
- CSS file placement follows the colocation-by-scope rules in `references/folder-structure.md` — each subcomponent owns its own `.css` file, and top-level CSS is only for shared values.

## Iteration

- Prefer nameful iterator variables: `items.map((item) => item.id)` not `items.map((i) => i.id)` or destructured `items.map(({ id }) => id)`. Exception: shorten when the full name is already used in scope.
