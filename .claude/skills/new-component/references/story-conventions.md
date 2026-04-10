# Story conventions

Place stories at `src/stories/ComponentName.stories.tsx`.

## Basic pattern — simple component

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@/components/ComponentName";

const meta: Meta<typeof ComponentName> = {
    title: "Components/ComponentName",
    component: ComponentName,
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
    render: () => <ComponentName>Hello</ComponentName>,
};
```

## Basic pattern — composite component

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@/components/ComponentName";

const meta: Meta<typeof ComponentName.Root> = {
    title: "Components/ComponentName",
    component: ComponentName.Root,
};

export default meta;
type Story = StoryObj<typeof ComponentName.Root>;

export const Default: Story = {
    render: () => (
        <ComponentName.Root>
            <ComponentName.Trigger>Open</ComponentName.Trigger>
            <ComponentName.Content>Hello</ComponentName.Content>
        </ComponentName.Root>
    ),
};
```

## Rules

- **Import from aliases**, not from relative paths. Stories should look like real consumer code. Follow the barrel specificity rule from `references/folder-structure.md`.
- **Group shared consts at the top** of the story file. Example: a `sampleItems` array used by multiple stories belongs above the `meta` declaration.
- **Cover all prop variations** across stories. Each meaningful prop (or prop combination) should have at least one story that demonstrates it.
- **Use realistic data**. Avoid `foo`/`bar` — use data that a real consumer would pass so the story doubles as documentation.
- **Name stories by what they demonstrate**, not by prop values. `WithIcon` is better than `IconTrue`. `Disabled` is better than `DisabledState`.

## Example with shared consts and multiple variants

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@/components/ComponentName";

const SAMPLE_OPTIONS = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
];

const meta: Meta<typeof ComponentName.Root> = {
    title: "Components/ComponentName",
    component: ComponentName.Root,
};

export default meta;
type Story = StoryObj<typeof ComponentName.Root>;

export const Default: Story = {
    render: () => <ComponentName.Root options={SAMPLE_OPTIONS} />,
};

export const Multiple: Story = {
    render: () => <ComponentName.Root options={SAMPLE_OPTIONS} multiple />,
};

export const Disabled: Story = {
    render: () => <ComponentName.Root options={SAMPLE_OPTIONS} disabled />,
};
```
