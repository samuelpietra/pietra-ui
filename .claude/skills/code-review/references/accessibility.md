# Accessibility (a11y)

## ARIA

- Correct roles, attributes, and landmark usage
- `aria-expanded`, `aria-selected`, `aria-controls`, `aria-activedescendant` where applicable
- Labels on interactive elements (visible or `aria-label`)
- Live regions (`aria-live`) for dynamic content updates

## Keyboard navigation

- Full keyboard operability: Tab, Enter, Space, Escape, Arrow keys
- Logical tab order
- No keyboard traps

## Focus management

- Visible focus indicators on all interactive elements
- Focus moved appropriately on open/close, mount/unmount
- Focus restored to trigger when popover/dialog closes

## Screen readers

- Semantic HTML elements where possible (`<button>`, `<nav>`, `<dialog>`)
- Descriptive labels — not just icon-only buttons without `aria-label`
- Meaningful `role` usage (e.g. `listbox`, `option`, `combobox`)

## Color contrast

- Text and interactive elements meet WCAG AA minimum contrast ratios
- Don't rely on color alone to convey meaning
