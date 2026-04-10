# Documentation rules

## What to document

- **Subcomponents with meaningful props** — props that control behavior, appearance, or composition. Use `<ArgTypes>` for these.
- **Context hooks** — document the returned fields in a manual HTML table. Consumers need to know what's available.
- **Non-obvious patterns** — field mappers, render props, composition patterns. Show focused code examples.
- **Each feature gets its own example** — selection, sorting, context menu, view switching, etc. One feature per section, one code block per section.

## What NOT to document

- **Pure Radix Themes passthroughs** — if a subcomponent just forwards props to a Radix primitive without adding anything, omit it. Radix already has docs for that API.
- **Trivial props** — don't give every `className` and `style` prop its own example. Only document props that affect behavior or are non-obvious.
- **Internal implementation details** — context internals, private hooks, internal state shape. Only document the public API surface.

## Performance rules

These are critical — a docs page that crashes the browser is worse than no docs.

- **Minimize `<Canvas>` renders.** Each `<Canvas>` mounts a live React tree. For components with virtualized lists, complex state, or heavy renders, a single `<Canvas>` can be expensive. Multiple `<Canvas>` blocks on one page compound the problem.
  - Use `<Canvas>` for the **hero example** (Default story) — one is fine.
  - Use `<Canvas>` sparingly for examples where the **visual output is essential** and the story is lightweight (e.g. empty state).
  - For everything else, use **fenced `tsx` code blocks**. They're static, fast, and copy-pasteable.
- **Never import all stories** just to render them. Only import the specific stories you reference.
- **Watch for heavy stories** — if a story renders large datasets, virtualized lists, or multiple instances of the same component, do NOT use `<Canvas>` for it. Show the code instead.

## Writing style

- **One-sentence descriptions** for subcomponents — don't over-explain
- **Code speaks** — prefer a focused code example over paragraphs of prose
- **Realistic data** — use data that a real consumer would pass, not foo/bar
- **Feature-focused examples** — each example demonstrates one thing. Don't combine selection + sorting + context menu in a single example.
