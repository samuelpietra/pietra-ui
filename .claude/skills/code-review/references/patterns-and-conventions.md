# Patterns and conventions

## File organization

- **One component per file** — never place two components in a single file; extract inner/helper components into their own file under a `components/` subfolder
- **Props colocated with component** — declare `ComponentNameProps` in the same file as the component, never in a separate `.types.ts` file
- **Inline props on inner/private components are fine** — only flag inline props when the type should be reused or exported
- **Barrel files** export both the component and its props type at every directory level
- **Colocation by scope** — files live at the narrowest scope that uses them (subcomponent → composite → repo)
- **Hooks always in a `hooks/` subfolder** with barrel `index.ts`, even for a single hook; flat files inside (`hooks/useHook.ts`, not `hooks/useHook/useHook.ts`)

## CSS

- Class naming follows `pietra-*` convention
- CSS values use Radix Themes tokens (`var(--space-*)`, `var(--gray-*)`, `var(--accent-*)`, `var(--radius-*)`, `var(--font-size-*)`) — never hardcoded values
- No redundant or conflicting styles
- Responsive considerations
- Avoid complex inline className construction — prefer `clsx` over repeated array-filter-join or ternary chains
- Styles colocated with the subcomponent they belong to — not concentrated in a single top-level CSS file

## Radix Themes alignment

- Match Radix component prop patterns (size, variant, color)
- Radix wrappers use `ComponentPropsWithoutRef<typeof RadixComponent.Sub>` to inherit prop types
- Consistent with Radix Themes' approach to styling

## Naming conventions

- PascalCase for components
- camelCase for hooks
- kebab-case for file names (except components which match their PascalCase name)
- Consistent prop naming with existing components
- Spread props always named `...props`, never `...rest`

## Type safety

- Proper generics usage
- Exported types for public API
- No `any` types (unless explicitly silenced with biome-ignore and a justification)
- Discriminated unions where appropriate
- Prefer `interface` over `type` for component props; use `type` only when `interface` is not possible (generics with defaults, mapped types, unions)
- **Avoid type casting** (`as`) — flag casts and suggest type guards or better data flow instead
- **Don't annotate return types** on functions where TypeScript can infer them — flag unnecessary explicit return types

## Consistency with existing patterns

- `forwardRef` on all components that render a DOM element
- `displayName` set on all components (dot notation for subcomponents)
- Barrel re-exports (named exports + type exports)
- Component structure matches established components (e.g. Catalog)
- Stories follow established patterns (Meta, StoryObj, render functions)
- Props destructured inline at the component declaration, not in the body
