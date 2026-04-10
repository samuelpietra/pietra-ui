---
name: new-component
description: Creates a new component in pietra-ui. Scaffolds the folder structure, subcomponents, types, tests, stories, and barrel exports following all project conventions, then registers it in the library index.
allowed-tools: Read, Glob, Grep, WebFetch, WebSearch, Write, Edit, Bash(npm run lint:*), Bash(npm run typecheck:*), Bash(npm test:*)
---

Scaffold a new pietra-ui component (a React component library built on Radix Themes) following all project conventions.

## Procedure

1. **Survey and research**
   - Read `src/components/index.ts` to see existing exports
   - Read an existing composite component (e.g. `src/components/Catalog/`) to see the folder structure in practice
   - If wrapping a Radix Themes component, check what subcomponents it exposes
   - **Research popular component libraries** (Radix UI, Chakra, Mantine, Ark UI, Shadcn, etc.) to understand common conventions for this type of component — API shape, prop naming, subcomponent composition, a11y patterns. Find the common sense across libraries before designing the API.

2. **Plan the layout**
   - Decide: composite (subparts) or simple (single element)?
   - Read `references/folder-structure.md` for the full tree of each layout and the key rules (barrel exports, props colocation, import conventions)

3. **Scaffold the files**
   - Read `references/coding-conventions.md` for the general component-writing rules (props destructuring, `forwardRef`, `displayName`, styling, iteration) — these apply throughout the rest of the procedure
   - Read `code-review/references/accessibility.md` for a11y requirements (ARIA, keyboard nav, focus management) — build these in from the start, don't bolt them on later
   - Use the templates in `assets/templates/` as starting points, replacing `{{ComponentName}}` (PascalCase) and `{{component-name}}` (kebab-case) tokens:
     - `Component.tsx.template` → the component file
     - `Component.test.tsx.template` → the test file (in `__tests__/`)
     - `Component.stories.tsx.template` → the story file (in `src/stories/`). For composite components, adapt the template to use dot notation (e.g. `ComponentName.Root`) — see the composite example in `references/story-conventions.md`
     - `index.ts.template` → each barrel file
   - For composite components, copy `Component.tsx.template` once per subcomponent (Root, Trigger, Content, etc.), each in its own subfolder under `components/`. Adapt each copy: rename tokens, adjust props, add `forwardRef` where needed
   - If wrapping a Radix Themes primitive, use the code examples in `references/radix-wrapper-pattern.md` as the template instead of the generic `Component.tsx.template` — the Radix pattern handles prop inheritance and ref forwarding differently

4. **Write meaningful tests**
   - Replace the placeholder test in `Component.test.tsx` with behavior-focused tests
   - Follow `references/test-conventions.md` — focus on user behavior, accessibility, and edge cases; avoid low-signal renders/ref/structural tests

5. **Write stories**
   - Replace the default story with realistic usage examples covering all prop variations
   - Follow `references/story-conventions.md` — group shared consts at the top, import from `@/components`

6. **Register the component**
   - Add the export to `src/components/index.ts` in alphabetical order

7. **Validate**
   - `npm run lint:fix` — fix lint/format issues
   - `npm run typecheck` — no type errors
   - `npm test` — all tests pass
   - If any check fails, fix the issue and re-run

## Output

When done, present:
- The final folder structure (tree view)
- A brief summary of what was created
- Validation results (lint, typecheck, tests)

Do NOT auto-run a code review — the user will review the files and invoke the code-review skill themselves.
