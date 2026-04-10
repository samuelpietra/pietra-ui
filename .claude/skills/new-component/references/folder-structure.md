# Folder structure

Two layouts are possible — pick based on whether the component has subparts.

## Composite components

For components with subparts (Root, Trigger, Content, etc.), use a nested layout:

```
src/components/ComponentName/
├── index.ts                          # Top-level barrel — re-exports from subdirectories
├── ComponentName.css                 # Shared styles only (CSS vars, root-level rules)
├── components/
│   ├── index.ts                      # Barrel for all subcomponents
│   ├── ComponentNameRoot/
│   │   ├── ComponentNameRoot.tsx     # Contains ComponentNameRootProps
│   │   ├── ComponentNameRoot.css     # Subcomponent-specific styles
│   │   └── index.ts                  # Exports component AND props type
│   ├── ComponentNameTrigger/
│   │   ├── ComponentNameTrigger.tsx
│   │   ├── ComponentNameTrigger.css
│   │   └── index.ts
│   └── ComponentNameContent/
│       ├── ComponentNameContent.tsx
│       ├── ComponentNameContent.css
│       └── index.ts
├── hooks/                            # Internal hooks (if needed)
│   ├── index.ts
│   └── useComponentNameSomething.ts
├── context/                          # Context + provider (if needed)
│   ├── index.ts
│   └── ComponentName.context.ts
├── __tests__/
│   └── ComponentName.test.tsx
└── __fixtures__/                     # Test fixtures (if needed)
    └── mocks.ts                      # Shared mock data and mock functions
```

## Simple components

For single-element components with no subparts. A single `ComponentName.css` alongside the `.tsx` is fine here — there are no subcomponents to colocate with, so the colocation-by-scope rules don't apply:

```
src/components/ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.css                 # If needed — single file is fine for simple components
└── __tests__/
    └── ComponentName.test.tsx
```

## Key rules

- Each subcomponent gets its own folder with a named file + `index.ts`
- Barrel `index.ts` at every directory level
- Each barrel exports both the component AND its props type
- Props types live in the same file as the component they describe — never a separate `.types.ts` file
- No flat files like `PopoverRoot.tsx` next to `PopoverContent.tsx` at the component root
- File placement follows the **colocation by scope** principle (see below) — where a file lives reflects how broadly it's shared

## Colocation by scope

Where a file lives in the tree reflects how broadly it's shared. Apply this principle to **styles, types, hooks, context, constants, helpers, and fixtures** — anything that isn't the component itself.

Start as narrow as possible. Only "lift" something up a scope when a second consumer needs it. Don't preemptively put things in the composite folder "just in case" — extract when the need actually appears.

**Hook-specific rules** (apply at every scope):
- Hooks **always** live in a `hooks/` subfolder with a barrel `index.ts`, even if there's only one hook
- Hook files are **flat** inside that folder — `hooks/useHook.ts`, never `hooks/useHook/useHook.ts`. Hooks don't get their own folder the way components do.

### Scope 1 — Used by a single subcomponent

Lives inside that subcomponent's folder, alongside its `.tsx`:

```
components/ComponentNameTrigger/
├── ComponentNameTrigger.tsx
├── ComponentNameTrigger.css          # Trigger-only styles
├── constants.ts                      # Trigger-only constants
├── hooks/                            # Trigger-only hooks — always in a hooks/ subfolder
│   ├── index.ts
│   └── useTriggerFocus.ts
└── index.ts
```

The `.tsx` imports its own files directly via relative paths:

```ts
import "./ComponentNameTrigger.css";
import { useTriggerFocus } from "./hooks";
```

### Scope 2 — Shared across subcomponents of the same composite

Lives at the top level of the composite component folder, usually in a named subfolder:

```
src/components/ComponentName/
├── ComponentName.css                 # Shared CSS vars / cross-subcomponent rules
├── constants.ts                      # Shared constants (e.g. ITEM_HEIGHT)
├── hooks/
│   ├── index.ts
│   └── useComponentNameState.ts      # Shared state hook
├── context/
│   ├── index.ts
│   └── ComponentName.context.ts      # Shared context/provider
└── components/
    └── ...
```

Subcomponents reach these via relative paths:

```ts
import { useComponentNameState } from "../../hooks";
import { ComponentNameContext } from "../../context";
```

### Scope 3 — Shared across the whole repo

Lives at the `src/` level in a matching top-level folder:

```
src/
├── hooks/
│   ├── index.ts
│   └── useLatest.ts                  # Used by multiple unrelated components
├── components/
│   ├── index.ts
│   └── Box/                          # Base component used everywhere
└── utils/
    └── clamp.ts                      # General-purpose helper
```

Consumers reach these via named aliases (crossing scopes):

```ts
import { useLatest } from "@/hooks";
import { Box } from "@/components/Box";
```

### Lifting decision

When deciding whether to lift something from Scope 1 → Scope 2 → Scope 3, ask: **"Does a consumer outside the current scope actually need this right now?"** If no, keep it narrow. If yes, move it up exactly one level — not two.

## Import conventions

### Relative vs alias paths

- **Same scope** (within the same component tree): use relative paths (`../`, `../../`)
  - e.g. a Catalog subcomponent importing a Catalog type → `import type { CatalogField } from "../../Catalog.types"`
  - e.g. a test importing the component it targets → `import { Catalog } from "../"`
- **Different scope** (crossing out of the current component, reaching top-level hooks, another component, etc.): use named aliases (`@/hooks`, `@/components`, `@/utils`)
  - e.g. a component importing a shared hook → `import { useLatest } from "@/hooks"`
  - e.g. a component importing another component → `import { Button } from "@/components/Button"`

### Barrel specificity

When importing from `@/components`, pick the barrel based on how many things you're importing:

- **Single import** → use the **specific** barrel:
  ```ts
  import { Button } from "@/components/Button";
  ```
- **Multiple imports** → use the **less specific** (top-level) barrel:
  ```ts
  import { Button, Dialog, Tag } from "@/components";
  ```

The same rule applies to hooks (`@/hooks/useSomething` for single, `@/hooks` for multiple) and any other aliased directory with barrel exports.

## Barrel exports

Each subcomponent's `index.ts` must export both the component and its props type:

```ts
export { ComponentNameRoot, type ComponentNameRootProps } from "./ComponentNameRoot";
```

The `components/index.ts` barrel aggregates all subcomponents and their types. The top-level `ComponentName/index.ts` re-exports from `./components` and composes the dot-notation API (e.g. `ComponentName.Root`, `ComponentName.Trigger`).
