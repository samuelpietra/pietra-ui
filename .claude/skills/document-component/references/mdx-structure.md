# MDX page structure

Every documentation page follows this exact section order. Reference `src/stories/Catalog.mdx` as the gold standard.

## 1. Imports

```tsx
import { ArgTypes, Canvas, Meta } from '@storybook/blocks';
import * as ComponentNameStories from './ComponentName.stories';

// Import specific components for ArgTypes — use direct file paths, not barrels
import { ComponentNameRoot } from '@/components/ComponentName/components/ComponentNameRoot/ComponentNameRoot';
```

Only import from Storybook blocks what you actually use. Only import stories you reference via `<Canvas>`. Only import components you reference via `<ArgTypes>`.

## 2. Meta

```tsx
<Meta of={ComponentNameStories} />
```

## 3. Collapsible styles (copy verbatim)

```html
<style>{`
  .docs-collapsible-summary {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .docs-collapsible-summary::before {
    content: '▶';
    font-size: 10px;
    margin-right: 8px;
  }
  details[open] > .docs-collapsible-summary::before {
    content: '▼';
    margin-right: 7px;
  }
  .docs-collapsible-summary h3 {
    cursor: pointer;
    display: inline;
    margin: 0;
  }
`}</style>
```

## 4. Title + description

```md
# ComponentName

One-sentence description of what the component does.
```

Add a `> **Note:**` callout below only if there's an important caveat (e.g. performance, required provider, browser support).

## 5. Source and issue links

```html
<a href="https://github.com/samuelpietra/pietra-ui/tree/main/src/components/ComponentName" target="_blank">View source ↗</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://github.com/samuelpietra/pietra-ui/issues/new?title=[ComponentName]+" target="_blank">Report an issue ↗</a>
```

## 6. Hero example

One `<Canvas>` render of the Default story, followed by a `tsx` code block showing the usage:

```tsx
<Canvas of={ComponentNameStories.Default} />
```

Then a fenced code block with the same usage written out. This serves as copy-pasteable starter code.

## 7. API Reference

One subsection per subcomponent worth documenting:

- **Subcomponents with meaningful props**: heading + one-sentence description + `<ArgTypes of={Component} />`
- **Simple subcomponents** (no props, or just forwards div props): heading + one-sentence prose description. No ArgTypes.
- **Context hooks** (`useComponentNameContext`): heading + description + manual HTML `<table>` listing context fields (name, type, description)
- **Pure Radix Themes passthroughs**: omit entirely — don't re-document what Radix already documents

## 8. Examples

One subsection per feature or pattern. Each example:

- **Heading** describing the feature (e.g. "Selection", "Sorting", "Context Menu")
- **Short prose** (1-2 sentences) explaining what the feature does and how to enable it
- **`tsx` code block** showing focused usage — not a full app, just the relevant props/pattern
- **`<Canvas>` only when the visual output matters** and the story is lightweight. Prefer code blocks over live renders.
