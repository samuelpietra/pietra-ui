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
- **Avoid type casting** (`as`) — let TypeScript infer types naturally. If a cast feels necessary, reconsider the data flow or add a type guard instead.
- **Don't annotate return types** on functions where TypeScript can infer them. Only add explicit return types at public API boundaries where inference would be unclear.

## Component identity

- Set `displayName` on every component using dot notation for subcomponents (e.g. `"ComponentName.Content"`).
- Use `forwardRef` on all components that render a DOM element (Trigger, Content, Close, etc.). Root/provider components that don't render a DOM element don't need it.

## Component preference

- **Always prefer local project components** (`Box`, `Flex`, `Text`, `IconButton`, `Separator`, etc.) over native HTML elements.
- If a local component doesn't exist yet, **prefer Radix Themes primitives** (`Theme`, `Container`, `Section`, etc.) over native HTML.
- **Native HTML tags are a last resort** — only use them when no local or Radix equivalent exists, or when semantic HTML is required (e.g. `<input>` with custom ARIA, `<form>`, `<label>`).

## Styling

- Use the `pietra-*` prefix for CSS classes.
- Use Radix Themes tokens for CSS values (`var(--space-*)`, `var(--gray-*)`, etc.) — never hardcoded values.
- CSS file placement follows the colocation-by-scope rules in `references/folder-structure.md` — each subcomponent owns its own `.css` file, and top-level CSS is only for shared values.

## Simplicity & readability

The code must be easy to read, understand, and replicate. Keep it simple — avoid overengineering.

- **One-liner callbacks stay inline** — don't wrap them in a named function just to pass to a prop:
  - Good: `onClick={() => setOpen(true)}`
  - Bad: defining `const handleClick = useCallback(() => setOpen(true), [])` then `onClick={handleClick}`
- **Long or complex functions → custom hook** — if a function grows too complicated or too long for the component body, extract it into a hook in the component's `hooks/` folder
- **Too many callbacks → `.utils.ts`** — if a component accumulates lots of callback/helper functions, move the non-hook logic to a colocated `ComponentName.utils.ts` file
- **No nested ternaries** — one level of ternary is fine; beyond that, use `if`/`else` or extract to a variable/function
- **No nested if-else chains** — flatten with early returns or `switch` statements
- **No long method chains** — avoid `data.filter(...).find(...).some(...)` in one expression. Break into named intermediate variables for readability
- **Avoid overengineering** — don't add abstractions, feature flags, or configurability beyond what's needed right now

## Iteration

- Prefer nameful iterator variables: `items.map((item) => item.id)` not `items.map((i) => i.id)` or destructured `items.map(({ id }) => id)`. Exception: shorten when the full name is already used in scope.
