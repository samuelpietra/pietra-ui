# Code quality

## Performance

- Unnecessary re-renders (missing or incorrect memoization)
- Stable callback references (`useCallback` where needed)
- Expensive computations without `useMemo`
- Component splitting opportunities (large components that could be decomposed)

## Readability

- Clear, self-documenting code — easy to read, understand, and replicate
- Appropriate abstractions (not over-engineered) — no premature abstractions, feature flags, or configurability beyond what's needed now
- No dead code or unused imports
- Comments only where logic isn't self-evident
- Nameful iterator variables: `items.map((item) => ...)` not `items.map((i) => ...)`
- **No nested ternaries** — one level is fine; beyond that, use `if`/`else` or extract to a variable
- **No nested if-else chains** — flatten with early returns or `switch` statements
- **No `else if`** — prefer early returns to keep code flat and readable
- **Every `switch` must have a `default` case** — even if it only contains `break`. Missing `default` is a critical issue.
- **No long method chains** — flag `data.filter(...).find(...).some(...)` in one expression; break into named intermediate variables
- **One-liner callbacks stay inline** — flag unnecessary wrapping of simple callbacks into named functions (e.g. `useCallback(() => setOpen(true), [])` when `() => setOpen(true)` suffices)
- **Too many callbacks in a component** — flag when a component file is bloated with helpers; suggest extracting to a `ComponentName.utils.ts` or a custom hook
- **Complex functions** — flag overly long or complicated functions; suggest extracting to a custom hook in the component's `hooks/` folder

## Reusable logic

- Flag duplicated logic across files — if the same computation or pattern appears in 2+ places, recommend extracting into a shared hook or utility
- Context-derived values that multiple consumers compute independently should live in the context provider instead

## Component & dependency hygiene

- **Local components first** → then Radix Themes primitives → native HTML as last resort
- Flag native elements (`<div>`, `<span>`, `<button>`, `<hr>`) that could be replaced by a local project component (`Box`, `Flex`, `Text`, `IconButton`, `Separator`) or a Radix Themes primitive
- Only accept native HTML when no local or Radix equivalent exists, or semantic HTML requires it (e.g. `<input>` with custom ARIA, `<form>`, `<label>`)
