---
name: document-component
description: Creates MDX documentation for a pietra-ui component following the Catalog.mdx format — title, hero example, API reference with prop tables, and feature-focused code examples.
allowed-tools: Read, Glob, Grep, Write, Edit
---

Create an MDX documentation page for a pietra-ui component at `src/stories/ComponentName.mdx`.

## Procedure

1. **Read the gold standard**
   - Read `src/stories/Catalog.mdx` — this is the reference format for all documentation pages
   - Read `references/mdx-structure.md` for the section-by-section breakdown

2. **Read the component**
   - Read all source files: components, hooks, context, types, CSS
   - Read the existing stories file (`src/stories/ComponentName.stories.tsx`) to identify which stories exist
   - Identify: which subcomponents have meaningful props? Which are pure passthroughs? Which hooks expose useful context?

3. **Apply documentation rules**
   - Read `references/documentation-rules.md` for what to document, what to skip, and performance constraints

4. **Write the MDX file**
   - Create `src/stories/ComponentName.mdx` following the structure from step 1
   - Import only the stories you actually need for `<Canvas>` renders (keep this minimal)
   - Import specific components for `<ArgTypes>` tables

5. **Review the result**
   - Verify the page structure matches Catalog.mdx
   - Confirm no unnecessary `<Canvas>` renders
   - Confirm pure passthroughs and trivial subcomponents are handled with prose only

## Output

Present:
- The file path created
- A brief summary of what sections were included
- Any subcomponents or props intentionally omitted, with reasoning
