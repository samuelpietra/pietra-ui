# Test conventions

Place tests at `src/components/ComponentName/__tests__/ComponentName.test.tsx`.

## Tooling

- `vitest` — `describe`, `it`, `expect`, `vi`
- `@testing-library/react` — `render`, `screen`
- `@testing-library/user-event` for realistic interactions when available

## What to test

Focus on user-observable behavior that catches real bugs:

- **Core feature behavior** — open/close, toggle, selection, filtering, keyboard navigation
- **User interactions** — click, keydown (Arrow keys, Enter, Escape), focus, blur
- **Accessibility** — aria roles, aria-expanded, aria-selected, aria-controls, screen reader semantics
- **Edge cases** — empty state, boundary conditions (first/last item, single item), disabled state

## What NOT to test

Avoid low-signal tests that inflate coverage without catching bugs:

- **Renders-X tests** — "renders close button". If interaction tests use the button, rendering is already covered.
- **Ref forwarding on trivial wrappers** — rarely catches real bugs. Only test ref forwarding if the component does something non-trivial with the ref.
- **Structural "exposes all subcomponents" tests** — if other tests use the subcomponents, they're implicitly covered.
- **Snapshot tests** of entire components — brittle and low-signal. Use targeted assertions.
- **Testing implementation details** — internal state shape, private helper functions. Test behavior, not internals.

## Fixtures and mocks

Place shared test data and mocks in `__tests__/__fixtures__/mocks.ts`. Import from there instead of inlining mock data across multiple test files:

```ts
// __fixtures__/mocks.ts
export const SAMPLE_OPTIONS = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
];

export const mockOnChangeFn = vi.fn();
```

```ts
// __tests__/ComponentName.test.tsx
import { SAMPLE_OPTIONS, mockOnChangeFn } from "../__fixtures__/mocks";
```

Naming rules:
- **UPPER_SNAKE_CASE** for constant data (`SAMPLE_OPTIONS`, `DEFAULT_PROPS`)
- **camelCase with `mock` prefix** for mock functions (`mockOnChangeFn`, `mockOnSelectFn`)

If mocks are trivial and only used in a single test file, inline them. Extract to `__fixtures__/mocks.ts` when the same data is (or would be) duplicated across multiple test files.

## Example shape

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ComponentName } from "../";

describe("ComponentName", () => {
    it("opens the content when the trigger is clicked", async () => {
        const user = userEvent.setup();
        render(
            <ComponentName.Root>
                <ComponentName.Trigger>Open</ComponentName.Trigger>
                <ComponentName.Content>Hello</ComponentName.Content>
            </ComponentName.Root>,
        );

        await user.click(screen.getByRole("button", { name: "Open" }));

        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
```
