# Test coverage review

## Tooling preferences

- **Always prefer `userEvent` over `fireEvent`** — flag `fireEvent` usage and suggest `userEvent` equivalent. `fireEvent` is a last resort for events `userEvent` doesn't support.
- **Avoid `container` from `render()`** — flag `container.querySelector` and suggest `screen` queries (by role, text, label). Only accept `container` when no semantic query can reach the element.

## What should be tested

- **User interactions** — click, keyboard (Tab, Enter, Escape, Arrow keys), focus, blur
- **Accessibility assertions** — roles, aria attributes, screen reader semantics
- **Core feature behavior** — open/close, toggle, selection, filtering, state transitions
- **Edge cases** — empty state, boundary conditions (first/last item), disabled state

## What should NOT be tested

Flag low-signal tests that exist only for coverage:

- "Renders X" tests — if interaction tests already use the element, rendering is implicitly covered
- Ref forwarding on trivial wrappers — rarely catches real bugs
- "Exposes all subcomponents" or structural tests — implicitly covered by tests that use the subcomponents
- Snapshot tests of entire components — brittle and low-signal
- Implementation detail tests — internal state shape, private helper functions

## Fixtures and mocks

- Shared mock data and mock functions live in `__fixtures__/mocks.ts` (sibling of `__tests__/`, not inside it)
- `UPPER_SNAKE_CASE` for constant data, `camelCase` with `mock` prefix for mock functions (e.g. `mockOnChangeFn`)
- Flag duplicated mock data across test files — extract to `__fixtures__/mocks.ts`
