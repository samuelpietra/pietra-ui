---
name: code-review
description: Reviews pietra-ui components for a11y, performance, readability, conventions, and consistency. Reports issues ranked by severity — never auto-fixes.
allowed-tools: Read, Glob, Grep
---

Review pietra-ui component code and report findings ranked by severity. Never auto-fix — wait for the user to decide what to address.

## Procedure

1. **Read the component(s)** under review — all source files, types, hooks, context, tests, stories, CSS, and barrel exports
2. **Read a reference component** (e.g. `src/components/Catalog/`) to understand established conventions in practice
3. **Check against all review checklists** — read each reference file and apply its criteria:
   - `references/accessibility.md` — ARIA, keyboard nav, focus, screen readers
   - `references/patterns-and-conventions.md` — file organization, CSS, Radix alignment, naming, type safety, consistency
   - `references/code-quality.md` — performance, readability, reusable logic, component hygiene
   - `references/testing.md` — test coverage quality
4. **Compile the findings** into the output format below
5. **STOP. Do NOT apply any fixes.** Wait for the user to decide what to address.

## Output format

```
## Code Review: [ComponentName]

### Critical
- **[Issue title]** — `file.tsx:42` — Description of why this is critical

### Major
- **[Issue title]** — `file.tsx:15` — Description and impact

### Minor
- **[Issue title]** — `file.tsx:88` — Description

### Nitpick
- **[Issue title]** — `file.tsx:3` — Suggestion

---
**Verdict**: [ship / no-ship] — [one-sentence summary]
```

If there are no issues at a severity level, omit that section entirely.
